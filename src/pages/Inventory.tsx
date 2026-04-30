import React from 'react';
import { Card, Button } from '../components/UI';
import { 
  History, 
  ArrowDownToLine, 
  ArrowUpFromLine, 
  Search, 
  Filter,
  Calendar,
  AlertCircle
} from 'lucide-react';

export default function Inventory() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-black text-navy tracking-tight">Stock Logistics</h2>
          <p className="text-gray-500 font-medium font-serif italic text-sm">Track restocks, batch movements, and expiry logs.</p>
        </div>
        <Button className="flex items-center gap-2">
          <ArrowDownToLine size={20} />
          <span>New Restock Entry</span>
        </Button>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <Card className="p-8 border-l-4 border-l-gold">
          <div className="flex items-center gap-4 mb-4">
             <div className="p-3 bg-gold/10 text-gold rounded-xl"><History size={24} /></div>
             <h4 className="font-bold text-navy">Recently Restocked</h4>
          </div>
          <p className="text-4xl font-black text-navy">124 <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">items</span></p>
          <p className="text-xs text-gray-500 mt-2">Last entry: 2 hours ago by <span className="font-bold">John Owner</span></p>
        </Card>
        
        <Card className="p-8 border-l-4 border-l-red-500">
          <div className="flex items-center gap-4 mb-4">
             <div className="p-3 bg-red-50 text-red-500 rounded-xl"><AlertCircle size={24} /></div>
             <h4 className="font-bold text-navy">Expiring Soon</h4>
          </div>
          <p className="text-4xl font-black text-red-500">8 <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">batches</span></p>
          <p className="text-xs text-gray-500 mt-2">Items expiring within <span className="font-bold">30 days</span></p>
        </Card>

        <Card className="p-8 border-l-4 border-l-green-500">
          <div className="flex items-center gap-4 mb-4">
             <div className="p-3 bg-green-50 text-green-500 rounded-xl"><ArrowUpFromLine size={24} /></div>
             <h4 className="font-bold text-navy">Best Selling Item</h4>
          </div>
          <p className="text-xl font-black text-navy truncate">Premium Arabica Coffee</p>
          <p className="text-xs text-gray-500 mt-2"><span className="font-bold text-green-500">452 units</span> sold this week</p>
        </Card>
      </div>

      <Card className="p-0 overflow-hidden">
        <div className="p-8 border-b border-gray-100 flex items-center justify-between">
          <h3 className="font-bold text-lg text-navy">Restock History</h3>
          <div className="flex gap-2">
            <button className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50"><Search size={18} /></button>
            <button className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50"><Filter size={18} /></button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100 uppercase tracking-widest text-[10px] font-black text-gray-400">
                <th className="px-8 py-4">Ref #</th>
                <th className="px-8 py-4">Product / SKU</th>
                <th className="px-8 py-4 text-center">Batch Number</th>
                <th className="px-8 py-4 text-center">QTY Added</th>
                <th className="px-8 py-4 text-center">Unit Cost</th>
                <th className="px-8 py-4 text-right">Total Cost</th>
                <th className="px-8 py-4 text-right">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {[1,2,3,4,5].map(i => (
                <tr key={i} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-8 py-4 font-mono text-xs text-gray-400">#RS-00{i}</td>
                  <td className="px-8 py-4">
                    <p className="font-bold text-navy text-sm">Product Name {i}</p>
                    <p className="text-[10px] font-bold text-gold uppercase">Beverages</p>
                  </td>
                  <td className="px-8 py-4 text-center text-sm font-mono uppercase text-gray-500">BCH-123456</td>
                  <td className="px-8 py-4 text-center font-black text-navy">+50</td>
                  <td className="px-8 py-4 text-center text-sm text-gray-500 font-bold">$12.00</td>
                  <td className="px-8 py-4 text-right font-black text-navy">$600.00</td>
                  <td className="px-8 py-4 text-right text-xs text-gray-400 font-medium whitespace-nowrap">Apr 28, 2026</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
