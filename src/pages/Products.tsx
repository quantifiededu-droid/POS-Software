import React, { useState, useEffect } from 'react';
import { Card, Button, Input } from '../components/UI';
import { 
  Package, 
  Plus, 
  Search, 
  Filter, 
  MoreVertical, 
  AlertCircle,
  Archive,
  Eye,
  Calendar,
  X
} from 'lucide-react';
import { useStore } from '../store/useStore';
import { motion, AnimatePresence } from 'motion/react';

export default function Products() {
  const { business } = useStore();
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [search, setSearch] = useState('');
  
  const [form, setForm] = useState({
    name: '',
    sku: '',
    category: '',
    unit: 'pcs',
    costPrice: '',
    sellingPrice: '',
    lowStockThreshold: '10',
    initialBatch: {
      number: `BCH-${Date.now().toString().slice(-6)}`,
      quantity: '',
      expiryDate: '',
      manufacturedDate: ''
    }
  });

  const fetchProducts = async () => {
    if (!business?.id) return;
    try {
      const res = await fetch(`/api/products/${business.id}`);
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [business?.id]);

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          businessId: business?.id,
          ...form,
          costPrice: parseFloat(form.costPrice),
          sellingPrice: parseFloat(form.sellingPrice),
          lowStockThreshold: parseInt(form.lowStockThreshold),
          initialBatch: {
            ...form.initialBatch,
            quantity: parseInt(form.initialBatch.quantity) || 0
          }
        }),
      });
      if (res.ok) {
        setIsAddModalOpen(false);
        fetchProducts();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(search.toLowerCase()) || 
    p.sku?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-black text-navy tracking-tight">Products Catalog</h2>
          <p className="text-gray-500 font-medium font-serif italic text-sm">Manage your business inventory and batches.</p>
        </div>
        <Button onClick={() => setIsAddModalOpen(true)} className="flex items-center gap-2">
          <Plus size={20} />
          <span>Add New Product</span>
        </Button>
      </div>

      <div className="flex gap-4 items-center">
        <Card className="flex-1 flex items-center gap-3 py-3 px-6 shadow-none border-gray-200">
          <Search size={20} className="text-gray-400" />
          <input 
            className="flex-1 bg-transparent border-none outline-none font-medium text-navy"
            placeholder="Search products by name, SKU or category..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </Card>
        <button className="flex items-center gap-2 px-6 py-3 bg-white border border-gray-200 rounded-xl text-navy font-bold hover:bg-gray-50 transition-all">
          <Filter size={20} />
          <span>Filters</span>
        </button>
      </div>

      <Card className="p-0 overflow-hidden shadow-sm border-gray-100">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="px-8 py-4 text-xs font-black text-gray-400 uppercase tracking-widest">Product Info</th>
                <th className="px-8 py-4 text-xs font-black text-gray-400 uppercase tracking-widest">Category</th>
                <th className="px-8 py-4 text-xs font-black text-gray-400 uppercase tracking-widest text-center">Batch Count</th>
                <th className="px-8 py-4 text-xs font-black text-gray-400 uppercase tracking-widest text-center">In Stock</th>
                <th className="px-8 py-4 text-xs font-black text-gray-400 uppercase tracking-widest text-right">Selling Price</th>
                <th className="px-8 py-4 text-xs font-black text-gray-400 uppercase tracking-widest text-center">Status</th>
                <th className="px-8 py-4 text-xs font-black text-gray-400 uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {!loading && filteredProducts.map(product => (
                <tr key={product.id} className="hover:bg-gray-50/50 transition-colors group">
                  <td className="px-8 py-4">
                    <div>
                      <p className="font-bold text-navy group-hover:text-gold transition-colors">{product.name}</p>
                      <p className="text-xs text-gray-400 font-medium">SKU: {product.sku}</p>
                    </div>
                  </td>
                  <td className="px-8 py-4">
                    <span className="px-3 py-1 bg-gray-100 rounded-lg text-[10px] font-black uppercase text-gray-500">
                      {product.category || 'General'}
                    </span>
                  </td>
                  <td className="px-8 py-4 text-center font-bold text-gray-500">1</td>
                  <td className="px-8 py-4 text-center">
                    <span className={`font-black ${product.total_stock <= product.low_stock_threshold ? 'text-red-500' : 'text-navy'}`}>
                      {product.total_stock || 0} {product.unit}
                    </span>
                  </td>
                  <td className="px-8 py-4 text-right font-black text-navy">${product.selling_price.toFixed(2)}</td>
                  <td className="px-8 py-4 text-center">
                    {product.total_stock <= 0 ? (
                      <span className="px-2 py-1 bg-red-50 text-red-500 text-[10px] font-bold rounded-md border border-red-100">Out of Stock</span>
                    ) : product.total_stock <= product.low_stock_threshold ? (
                      <span className="px-2 py-1 bg-amber-50 text-amber-500 text-[10px] font-bold rounded-md border border-amber-100">Low Stock</span>
                    ) : (
                      <span className="px-2 py-1 bg-green-50 text-green-500 text-[10px] font-bold rounded-md border border-green-100">Healthy</span>
                    )}
                  </td>
                  <td className="px-8 py-4 text-right">
                    <button className="p-2 text-gray-400 hover:text-navy hover:bg-gray-100 rounded-lg transition-all">
                      <MoreVertical size={20} />
                    </button>
                  </td>
                </tr>
              ))}
              
              {loading && (
                <tr>
                  <td colSpan={7} className="px-8 py-20 text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-gold mx-auto" />
                  </td>
                </tr>
              )}

              {!loading && filteredProducts.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-8 py-20 text-center space-y-4">
                    <Archive size={48} className="mx-auto text-gray-100" />
                    <p className="text-gray-400 font-serif italic text-lg">Your inventory is empty. Start adding your first product.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Add Product Modal */}
      <AnimatePresence>
        {isAddModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-8">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsAddModalOpen(false)}
              className="absolute inset-0 bg-navy/60 backdrop-blur-sm"
            />
            <motion.form
              onSubmit={handleAddProduct}
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-4xl bg-surface rounded-3xl overflow-hidden shadow-2xl flex flex-col"
            >
              <div className="p-8 border-b flex justify-between items-center bg-gray-50/50">
                <div>
                  <h3 className="text-2xl font-black text-navy tracking-tight">Add New Product</h3>
                  <p className="text-gray-500 text-sm font-medium">Create a new product record and its first stock batch.</p>
                </div>
                <button 
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="p-2 hover:bg-gray-200 rounded-full transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="flex-1 p-8 grid grid-cols-2 gap-10 overflow-y-auto">
                <div className="space-y-6">
                  <h4 className="flex items-center gap-2 text-sm font-black uppercase text-gold tracking-widest mb-4">
                    <div className="w-6 h-[1px] bg-gold" />
                    General Information
                  </h4>
                  <Input 
                    label="Product Name" 
                    placeholder="e.g. Clemtrix Premium Coffee" 
                    required
                    value={form.name}
                    onChange={e => setForm({...form, name: e.target.value})}
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <Input 
                      label="Category" 
                      placeholder="e.g. Beverages"
                      value={form.category}
                      onChange={e => setForm({...form, category: e.target.value})}
                    />
                    <Input 
                      label="SKU / Barcode" 
                      placeholder="e.g. CLM-12345"
                      value={form.sku}
                      onChange={e => setForm({...form, sku: e.target.value})}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <Input 
                      label="Cost Price ($)" 
                      type="number" 
                      step="0.01" 
                      placeholder="0.00"
                      value={form.costPrice}
                      onChange={e => setForm({...form, costPrice: e.target.value})}
                    />
                    <Input 
                      label="Selling Price ($)" 
                      type="number" 
                      step="0.01" 
                      placeholder="0.00" 
                      required
                      value={form.sellingPrice}
                      onChange={e => setForm({...form, sellingPrice: e.target.value})}
                    />
                  </div>
                </div>

                <div className="space-y-6">
                  <h4 className="flex items-center gap-2 text-sm font-black uppercase text-gold tracking-widest mb-4">
                    <div className="w-6 h-[1px] bg-gold" />
                    Initial Stock Batch
                  </h4>
                  <div className="grid grid-cols-2 gap-4">
                    <Input 
                      label="Batch Number" 
                      readOnly 
                      value={form.initialBatch.number}
                    />
                    <Input 
                      label="Initial Quantity" 
                      type="number" 
                      placeholder="0"
                      value={form.initialBatch.quantity}
                      onChange={e => setForm({
                        ...form, 
                        initialBatch: {...form.initialBatch, quantity: e.target.value}
                      })}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <Input 
                      label="Manuf. Date" 
                      type="date"
                      value={form.initialBatch.manufacturedDate}
                      onChange={e => setForm({
                        ...form, 
                        initialBatch: {...form.initialBatch, manufacturedDate: e.target.value}
                      })}
                    />
                    <Input 
                      label="Expiry Date" 
                      type="date"
                      value={form.initialBatch.expiryDate}
                      onChange={e => setForm({
                        ...form, 
                        initialBatch: {...form.initialBatch, expiryDate: e.target.value}
                      })}
                    />
                  </div>
                  <Input 
                    label="Low Stock Alert Threshold" 
                    type="number" 
                    value={form.lowStockThreshold}
                    onChange={e => setForm({...form, lowStockThreshold: e.target.value})}
                  />
                </div>
              </div>

              <div className="p-8 border-t bg-gray-50 flex justify-end gap-4">
                <Button variant="outline" type="button" onClick={() => setIsAddModalOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" className="px-10">
                  Save Product
                </Button>
              </div>
            </motion.form>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
