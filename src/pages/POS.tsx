import React, { useState, useEffect, useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import { Card, Button } from '../components/UI';
import {
  Search,
  Trash2,
  Plus,
  Minus,
  CreditCard,
  Banknote,
  Smartphone,
  CheckCircle2,
  ShoppingCart,
} from 'lucide-react';
import { useStore } from '../store/useStore';
import { motion, AnimatePresence } from 'motion/react';
import { ClemtrixLogo } from '../components/Branding';

const Receipt = React.forwardRef(({ sale, business, user, items }: any, ref: any) => {
  const total = items.reduce(
    (acc: number, item: any) =>
      acc + item.quantity * Number(item.unitPrice || 0),
    0
  );

  return (
    <div ref={ref} className="p-8 bg-white w-[300px] text-black font-sans text-xs">
      <div className="text-center mb-6">
        <div className="flex justify-center mb-2">
          <ClemtrixLogo className="h-6 [&_span]:text-black" />
        </div>

        <h2 className="text-sm font-black uppercase tracking-widest">
          {business?.name || 'Clemtrix POS'}
        </h2>

        <p className="text-[10px] text-gray-500">
          {business?.address || 'Main Branch'}
        </p>

        <p className="text-[10px] text-gray-500">
          {business?.phone || ''}
        </p>
      </div>

      <div className="border-t border-b border-dashed border-black py-2 my-4 space-y-1">
        <div className="flex justify-between">
          <span>Date: {new Date().toLocaleDateString()}</span>
          <span>Time: {new Date().toLocaleTimeString()}</span>
        </div>

        <div className="flex justify-between">
          <span>
            Receipt #: {sale?.id?.slice(0, 8).toUpperCase() || 'DRAFT'}
          </span>
          <span>Cashier: {user?.full_name || 'User'}</span>
        </div>
      </div>

      <table className="w-full mb-4">
        <thead>
          <tr className="border-b border-black">
            <th className="text-left font-black pb-1">ITEM</th>
            <th className="text-center font-black pb-1">QTY</th>
            <th className="text-right font-black pb-1">PRICE</th>
            <th className="text-right font-black pb-1">TOTAL</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-100 italic">
          {items.map((item: any) => (
            <tr key={item.productId}>
              <td className="py-2">{item.name}</td>
              <td className="py-2 text-center">{item.quantity}</td>
              <td className="py-2 text-right">
                ${Number(item.unitPrice || 0).toFixed(2)}
              </td>
              <td className="py-2 text-right">
                ${(item.quantity * Number(item.unitPrice || 0)).toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="border-t border-dashed border-black pt-2 space-y-1">
        <div className="flex justify-between">
          <span>SUBTOTAL</span>
          <span>${total.toFixed(2)}</span>
        </div>

        <div className="flex justify-between">
          <span>TAX (0%)</span>
          <span>$0.00</span>
        </div>

        <div className="flex justify-between font-black text-sm">
          <span>TOTAL</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>

      <div className="mt-6 pt-4 border-t border-black text-center text-[10px] space-y-1">
        <p className="font-bold">PAYMENT: {sale?.paymentMethod || 'CASH'}</p>
        <p>Thank you for shopping with us!</p>
        <p className="italic opacity-50 mt-4">
          Powered by Clemtrix Technologies
        </p>
      </div>
    </div>
  );
});

Receipt.displayName = 'Receipt';

export default function POS() {
  const {
    business,
    user,
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
  } = useStore();

  const [products, setProducts] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const [paymentMethod, setPaymentMethod] =
    useState<'Cash' | 'Card' | 'Mobile'>('Cash');
  const [loading, setLoading] = useState(false);
  const [productsLoading, setProductsLoading] = useState(false);
  const [error, setError] = useState('');
  const [successSaleId, setSuccessSaleId] = useState<string | null>(null);

  const receiptRef = useRef(null);

  const handlePrint = useReactToPrint({
    contentRef: receiptRef,
  });

  const fetchProducts = () => {
    if (!business?.id) return;

    setProductsLoading(true);

    fetch(`/api/products/${business.id}`)
      .then(async (res) => {
        if (!res.ok) {
          throw new Error('Failed to fetch products');
        }

        return res.json();
      })
      .then((data) => {
        setProducts(data);
        setError('');
      })
      .catch((err) => {
        console.error(err);
        setError('Could not load products.');
      })
      .finally(() => {
        setProductsLoading(false);
      });
  };

  useEffect(() => {
    fetchProducts();
  }, [business?.id]);

  const filteredProducts = products.filter((product) => {
    const name = product.name?.toLowerCase() || '';
    const sku = product.sku?.toLowerCase() || '';
    const query = search.toLowerCase();

    return name.includes(query) || sku.includes(query);
  });

  const cartTotal = cart.reduce(
    (acc, item) => acc + item.quantity * Number(item.unitPrice || 0),
    0
  );

  const handleCheckout = async () => {
    if (cart.length === 0 || loading) return;

    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/sales', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          businessId: business?.id,
          userId: user?.id,
          items: cart,
          totalAmount: cartTotal,
          discount: 0,
          tax: 0,
          paymentMethod,
        }),
      });

      if (!res.ok) {
        throw new Error('Checkout failed');
      }

      const data = await res.json();

      if (data.success) {
        setSuccessSaleId(data.saleId);
      } else {
        throw new Error(data.message || 'Checkout failed');
      }
    } catch (err) {
      console.error(err);
      setError('Could not complete sale. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        handleCheckout();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [cart, paymentMethod, loading]);

  const closeSuccessAndClear = () => {
    setSuccessSaleId(null);
    clearCart();
    fetchProducts();
  };

  return (
    <div className="flex flex-col xl:flex-row gap-6 min-h-[calc(100vh-10rem)]">
      <div className="flex-1 flex flex-col gap-6">
        <Card className="flex items-center gap-4 py-4 px-6 shrink-0">
          <div className="bg-gray-50 p-2 rounded-lg text-gray-400">
            <Search size={20} />
          </div>

          <input
            className="flex-1 bg-transparent border-none outline-none font-medium placeholder:text-gray-400 text-navy"
            placeholder="Search products by name or SKU..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <div className="hidden lg:flex items-center gap-2">
            {['All', 'Beverages', 'Snacks', 'Food'].map((cat) => (
              <button
                key={cat}
                className="px-3 py-1.5 rounded-lg text-xs font-bold text-gray-500 hover:bg-gray-100 transition-colors"
              >
                {cat}
              </button>
            ))}
          </div>
        </Card>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 rounded-2xl px-5 py-4 text-sm font-bold">
            {error}
          </div>
        )}

        <div className="flex-1 overflow-y-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 content-start pr-2">
          {productsLoading && (
            <div className="col-span-full py-20 text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-gold mx-auto" />
              <p className="text-gray-400 mt-4 font-semibold">
                Loading products...
              </p>
            </div>
          )}

          {!productsLoading && products.length === 0 && (
            <div className="col-span-full py-20 text-center">
              <p className="text-gray-400 text-lg font-semibold">
                No products available yet.
              </p>
            </div>
          )}

          {!productsLoading &&
            products.length > 0 &&
            filteredProducts.length === 0 && (
              <div className="col-span-full py-20 text-center space-y-4">
                <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto">
                  <Search size={32} className="text-gray-200" />
                </div>

                <p className="text-gray-400 italic text-lg">
                  No products match your search.
                </p>
              </div>
            )}

          {!productsLoading &&
            filteredProducts.map((product) => (
              <button
                key={product.id}
                onClick={() =>
                  addToCart({
                    productId: product.id,
                    name: product.name,
                    unitPrice: Number(product.selling_price || 0),
                    totalStock: Number(product.total_stock || 0),
                    quantity: 1,
                  })
                }
                disabled={Number(product.total_stock || 0) <= 0}
                className="group relative bg-surface p-4 rounded-2xl shadow-sm border border-gray-100 hover:border-gold hover:shadow-xl hover:shadow-gold/10 transition-all text-left flex flex-col disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <div className="flex-1">
                  <span className="text-[10px] font-black uppercase text-gold bg-gold/10 px-2 py-0.5 rounded mb-2 inline-block">
                    {product.category || 'General'}
                  </span>

                  <h4 className="font-bold text-navy text-sm leading-tight mb-1 group-hover:text-gold transition-colors">
                    {product.name}
                  </h4>

                  <p className="text-xs text-gray-400 font-medium">
                    SKU: {product.sku || 'N/A'}
                  </p>
                </div>

                <div className="mt-4 flex items-center justify-between border-t pt-3">
                  <p className="font-black text-navy">
                    ${Number(product.selling_price || 0).toFixed(2)}
                  </p>

                  <div className="flex items-center gap-1.5">
                    <div
                      className={`w-2 h-2 rounded-full ${
                        Number(product.total_stock || 0) > 10
                          ? 'bg-green-500'
                          : 'bg-red-500'
                      }`}
                    />

                    <span className="text-[10px] font-bold text-gray-500 uppercase">
                      {Number(product.total_stock || 0)} left
                    </span>
                  </div>
                </div>
              </button>
            ))}
        </div>
      </div>

      <Card className="w-full xl:w-96 flex flex-col p-0 overflow-hidden shrink-0">
        <div className="p-6 border-b border-gray-50 flex items-center justify-between">
          <h3 className="font-bold text-lg flex items-center gap-2">
            Current Cart
            <span className="bg-gold/20 text-gold text-xs px-2 py-0.5 rounded-full">
              {cart.length}
            </span>
          </h3>

          <button
            onClick={clearCart}
            disabled={cart.length === 0}
            className="text-red-500 p-2 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-40"
          >
            <Trash2 size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-3 min-h-[280px]">
          {cart.map((item) => (
            <div
              key={item.productId}
              className="flex flex-col gap-2 p-3 rounded-xl bg-gray-50 border border-transparent hover:border-gray-200 transition-all"
            >
              <div className="flex justify-between items-start">
                <span className="font-bold text-sm text-navy flex-1 pr-2 leading-tight">
                  {item.name}
                </span>

                <span className="font-black text-sm text-navy">
                  ${(item.quantity * Number(item.unitPrice || 0)).toFixed(2)}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-gray-400 uppercase">
                  ${Number(item.unitPrice || 0).toFixed(2)} / unit
                </span>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => {
                      if (item.quantity <= 1) {
                        removeFromCart(item.productId);
                      } else {
                        updateQuantity(item.productId, item.quantity - 1);
                      }
                    }}
                    className="w-7 h-7 flex items-center justify-center rounded-lg bg-white border border-gray-200 text-gray-500 hover:text-navy hover:shadow-sm transition-all"
                  >
                    <Minus size={14} />
                  </button>

                  <span className="font-black text-sm w-4 text-center">
                    {item.quantity}
                  </span>

                  <button
                    onClick={() =>
                      updateQuantity(item.productId, item.quantity + 1)
                    }
                    disabled={item.quantity >= item.totalStock}
                    className="w-7 h-7 flex items-center justify-center rounded-lg bg-white border border-gray-200 text-gray-500 hover:text-navy hover:shadow-sm transition-all disabled:opacity-40"
                  >
                    <Plus size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}

          {cart.length === 0 && (
            <div className="h-full flex flex-col items-center justify-center text-center p-8 space-y-4">
              <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center text-gray-200">
                <ShoppingCart size={32} />
              </div>

              <p className="text-gray-400 italic">
                Your cart is empty. Start adding items.
              </p>
            </div>
          )}
        </div>

        <div className="p-6 border-t border-gray-50 space-y-6">
          <div className="space-y-2">
            <div className="flex justify-between text-sm font-bold text-gray-500">
              <span>Subtotal</span>
              <span>${cartTotal.toFixed(2)}</span>
            </div>

            <div className="flex justify-between text-sm font-bold text-gray-500">
              <span>Tax (0%)</span>
              <span>$0.00</span>
            </div>

            <div className="flex justify-between text-2xl font-black text-navy pt-2">
              <span>Total</span>
              <span>${cartTotal.toFixed(2)}</span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2">
            {[
              { id: 'Cash', icon: Banknote },
              { id: 'Card', icon: CreditCard },
              { id: 'Mobile', icon: Smartphone },
            ].map((method) => (
              <button
                key={method.id}
                onClick={() => setPaymentMethod(method.id as any)}
                className={`flex flex-col items-center justify-center gap-2 p-3 rounded-xl border-2 transition-all ${
                  paymentMethod === method.id
                    ? 'border-gold bg-gold/5 text-navy font-bold'
                    : 'border-transparent bg-gray-50 text-gray-400 grayscale hover:grayscale-0'
                }`}
              >
                <method.icon size={20} />
                <span className="text-[10px] uppercase font-black">
                  {method.id}
                </span>
              </button>
            ))}
          </div>

          <Button
            className="w-full h-14 text-lg"
            disabled={cart.length === 0 || loading}
            onClick={handleCheckout}
          >
            {loading
              ? 'Processing...'
              : `Complete Sale • $${cartTotal.toFixed(2)}`}
          </Button>

          <p className="text-center text-xs text-gray-400 font-medium">
            Shortcut: Ctrl/Cmd + Enter to complete sale
          </p>
        </div>
      </Card>

      <AnimatePresence>
        {successSaleId && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-8">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeSuccessAndClear}
              className="absolute inset-0 bg-navy/80 backdrop-blur-sm"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-lg bg-surface rounded-3xl overflow-hidden shadow-2xl flex"
            >
              <div className="flex-1 p-8 text-center bg-green-50 flex flex-col items-center justify-center border-r border-gray-100">
                <div className="w-20 h-20 bg-green-500 text-white rounded-full flex items-center justify-center mb-6 shadow-lg shadow-green-500/20">
                  <CheckCircle2 size={40} />
                </div>

                <h2 className="text-2xl font-black text-navy mb-2">
                  Sale Successful!
                </h2>

                <p className="text-gray-500 font-medium mb-8">
                  Transaction ID: #{successSaleId.slice(0, 8).toUpperCase()}
                </p>

                <div className="space-y-3 w-full">
                  <Button className="w-full" onClick={() => handlePrint()}>
                    Print Receipt
                  </Button>

                  <button
                    onClick={closeSuccessAndClear}
                    className="w-full p-4 text-center font-bold text-gray-500 hover:text-navy transition-colors"
                  >
                    Done & Close
                  </button>
                </div>
              </div>

              <div className="hidden">
                <Receipt
                  ref={receiptRef}
                  business={business}
                  user={user}
                  items={cart}
                  sale={{ id: successSaleId, paymentMethod }}
                />
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
