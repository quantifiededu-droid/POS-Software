import React, { useEffect, useState } from 'react';
import { Card, Button } from '../components/UI';
import {
  History,
  ArrowDownToLine,
  ArrowUpFromLine,
  Search,
  Filter,
  AlertCircle,
  Package,
} from 'lucide-react';
import { useStore } from '../store/useStore';

export default function Inventory() {
  const { business } = useStore();
  const [products, setProducts] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!business?.id) return;

    fetch(`/api/products/${business.id}`)
      .then(async (res) => {
        if (!res.ok) throw new Error('Failed to fetch inventory');
        return res.json();
      })
      .then((data) => setProducts(data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [business?.id]);

  const filteredProducts = products.filter((product) => {
    const query = search.toLowerCase();

    return (
      product.name?.toLowerCase().includes(query) ||
      product.sku?.toLowerCase().includes(query) ||
      product.category?.toLowerCase().includes(query)
    );
  });

  const totalStock = products.reduce(
    (sum, product) => sum + Number(product.total_stock || 0),
    0
  );

  const lowStockCount = products.filter(
    (product) =>
      Number(product.total_stock || 0) <=
      Number(product.low_stock_threshold || 0)
  ).length;

  const bestStockedProduct = [...products].sort(
    (a, b) => Number(b.total_stock || 0) - Number(a.total_stock || 0)
  )[0];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-black text-navy tracking-tight">
            Stock Logistics
          </h2>

          <p className="text-gray-500 font-medium italic text-sm">
            Track inventory levels, low stock items, and product movement.
          </p>
        </div>

        <Button className="flex items-center gap-2">
          <ArrowDownToLine size={20} />
          <span>New Restock Entry</span>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-8 border-l-4 border-l-gold">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-gold/10 text-gold rounded-xl">
              <History size={24} />
            </div>

            <h4 className="font-bold text-navy">Total Stock</h4>
          </div>

          <p className="text-4xl font-black text-navy">
            {totalStock}{' '}
            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">
              units
            </span>
          </p>

          <p className="text-xs text-gray-500 mt-2">
            Across <span className="font-bold">{products.length}</span>{' '}
            products
          </p>
        </Card>

        <Card className="p-8 border-l-4 border-l-red-500">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-red-50 text-red-500 rounded-xl">
              <AlertCircle size={24} />
            </div>

            <h4 className="font-bold text-navy">Low Stock</h4>
          </div>

          <p className="text-4xl font-black text-red-500">
            {lowStockCount}{' '}
            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">
              items
            </span>
          </p>

          <p className="text-xs text-gray-500 mt-2">
            Products at or below alert threshold
          </p>
        </Card>

        <Card className="p-8 border-l-4 border-l-green-500">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-green-50 text-green-500 rounded-xl">
              <ArrowUpFromLine size={24} />
            </div>

            <h4 className="font-bold text-navy">Highest Stock</h4>
          </div>

          <p className="text-xl font-black text-navy truncate">
            {bestStockedProduct?.name || 'No product yet'}
          </p>

          <p className="text-xs text-gray-500 mt-2">
            <span className="font-bold text-green-500">
              {Number(bestStockedProduct?.total_stock || 0)} units
            </span>{' '}
            available
          </p>
        </Card>
      </div>

      <Card className="p-0 overflow-hidden">
        <div className="p-8 border-b border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <h3 className="font-bold text-lg text-navy">Inventory Overview</h3>

          <div className="flex gap-2">
            <div className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg bg-white">
              <Search size={18} className="text-gray-400" />

              <input
                className="outline-none bg-transparent text-sm font-medium text-navy"
                placeholder="Search inventory..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <button className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50">
              <Filter size={18} />
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100 uppercase tracking-widest text-[10px] font-black text-gray-400">
                <th className="px-8 py-4">Product / SKU</th>
                <th className="px-8 py-4 text-center">Category</th>
                <th className="px-8 py-4 text-center">Current Stock</th>
                <th className="px-8 py-4 text-center">Low Stock Limit</th>
                <th className="px-8 py-4 text-right">Cost Price</th>
                <th className="px-8 py-4 text-right">Selling Price</th>
                <th className="px-8 py-4 text-right">Status</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-50">
              {loading && (
                <tr>
                  <td colSpan={7} className="px-8 py-20 text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-gold mx-auto" />
                  </td>
                </tr>
              )}

              {!loading &&
                filteredProducts.map((product) => {
                  const stock = Number(product.total_stock || 0);
                  const threshold = Number(product.low_stock_threshold || 0);

                  return (
                    <tr
                      key={product.id}
                      className="hover:bg-gray-50/50 transition-colors"
                    >
                      <td className="px-8 py-4">
                        <p className="font-bold text-navy text-sm">
                          {product.name}
                        </p>

                        <p className="text-[10px] font-bold text-gold uppercase">
                          SKU: {product.sku || 'N/A'}
                        </p>
                      </td>

                      <td className="px-8 py-4 text-center text-sm font-bold text-gray-500">
                        {product.category || 'General'}
                      </td>

                      <td className="px-8 py-4 text-center font-black text-navy">
                        {stock} {product.unit || 'pcs'}
                      </td>

                      <td className="px-8 py-4 text-center text-sm text-gray-500 font-bold">
                        {threshold}
                      </td>

                      <td className="px-8 py-4 text-right text-sm text-gray-500 font-bold">
                        ${Number(product.cost_price || 0).toFixed(2)}
                      </td>

                      <td className="px-8 py-4 text-right font-black text-navy">
                        ${Number(product.selling_price || 0).toFixed(2)}
                      </td>

                      <td className="px-8 py-4 text-right">
                        {stock <= 0 ? (
                          <span className="px-2 py-1 bg-red-50 text-red-500 text-[10px] font-bold rounded-md border border-red-100">
                            Out of Stock
                          </span>
                        ) : stock <= threshold ? (
                          <span className="px-2 py-1 bg-amber-50 text-amber-500 text-[10px] font-bold rounded-md border border-amber-100">
                            Low Stock
                          </span>
                        ) : (
                          <span className="px-2 py-1 bg-green-50 text-green-500 text-[10px] font-bold rounded-md border border-green-100">
                            Healthy
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })}

              {!loading && filteredProducts.length === 0 && (
                <tr>
                  <td
                    colSpan={7}
                    className="px-8 py-20 text-center text-gray-400"
                  >
                    <Package size={44} className="mx-auto mb-3 text-gray-200" />
                    No inventory records found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
