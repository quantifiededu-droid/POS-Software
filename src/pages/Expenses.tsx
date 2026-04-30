import React, { useState } from 'react';
import { Card, Button, Input } from '../components/UI';
import { 
  Wallet, 
  Plus, 
  ArrowUpRight, 
  ArrowDownRight, 
  Filter,
  PieChart as PieChartIcon
} from 'lucide-react';
import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer, 
  Tooltip 
} from 'recharts';

const categories = [
  { name: 'Rent', color: '#0D1B2A' },
  { name: 'Utilities', color: '#F5A623' },
  { name: 'Salaries', color: '#10B981' },
  { name: 'Supplies', color: '#3B82F6' },
  { name: 'Other', color: '#64748B' },
];

export default function Expenses() {
  const [data] = useState([
    { name: 'Rent', value: 1200 },
    { name: 'Utilities', value: 450 },
    { name: 'Salaries', value: 3000 },
    { name: 'Supplies', value: 800 },
    { name: 'Other', value: 150 },
  ]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-black text-navy tracking-tight">Expense Tracker</h2>
          <p className="text-gray-500 font-medium font-serif italic text-sm">Monitor your outflows and business costs.</p>
        </div>
        <Button className="flex items-center gap-2">
          <Plus size={20} />
          <span>Add New Expense</span>
        </Button>
      </div>

      <div className="grid grid-cols-4 gap-6">
        <Card className="col-span-1 p-8 bg-navy text-white">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-gold">
              <Wallet size={24} />
            </div>
            <div>
              <p className="text-xs font-bold text-white/50 uppercase tracking-widest leading-none mb-1">Total Monthly</p>
              <h3 className="text-2xl font-black">$5,600.00</h3>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex justify-between items-center bg-white/5 p-3 rounded-xl">
              <span className="text-xs text-white/60">Vs Last Month</span>
              <span className="text-xs font-bold text-red-400 font-mono">+12%</span>
            </div>
          </div>
        </Card>

        <Card className="col-span-2 p-0 flex">
          <div className="w-1/2 p-8 border-r border-gray-50 flex flex-col justify-center">
            <h4 className="text-sm font-black text-gray-400 uppercase tracking-widest mb-6">Expense Breakdown</h4>
            <div className="space-y-3">
              {data.map((entry, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: categories[index].color }} />
                    <span className="text-sm font-bold text-navy">{entry.name}</span>
                  </div>
                  <span className="text-sm font-black text-gray-500">${entry.value}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="w-1/2 p-4 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={categories[index % categories.length].color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-8 flex flex-col items-center justify-center text-center">
          <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center text-green-500 mb-4">
            <ArrowUpRight size={32} />
          </div>
          <h4 className="text-sm font-black text-gray-400 uppercase tracking-widest mb-1">Estimated Net Profit</h4>
          <p className="text-3xl font-black text-navy">$12,450.00</p>
          <p className="text-xs text-green-500 mt-2 font-bold tracking-tight">Income exceeds expenses by 220%</p>
        </Card>
      </div>

      <Card className="p-0 overflow-hidden">
        <div className="p-8 border-b border-gray-100 flex items-center justify-between">
          <h3 className="text-xl font-bold text-navy">Recent Expenses</h3>
          <button className="flex items-center gap-2 text-gray-400 hover:text-navy transition-colors font-bold text-sm">
            <Filter size={16} />
            <span>Filter</span>
          </button>
        </div>
        <table className="w-full text-left">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100 italic">
              <th className="px-8 py-4 text-xs font-black text-gray-400 uppercase tracking-widest">Category</th>
              <th className="px-8 py-4 text-xs font-black text-gray-400 uppercase tracking-widest">Description</th>
              <th className="px-8 py-4 text-xs font-black text-gray-400 uppercase tracking-widest text-center">Date</th>
              <th className="px-8 py-4 text-xs font-black text-gray-400 uppercase tracking-widest text-right">Amount</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {[1,2,3].map(i => (
              <tr key={i} className="hover:bg-gray-50 transition-colors">
                <td className="px-8 py-4">
                  <span className="px-3 py-1 bg-navy/5 text-navy text-[10px] font-black uppercase rounded-lg">Rent</span>
                </td>
                <td className="px-8 py-4 text-sm font-medium text-navy">Monthly shop rent - April</td>
                <td className="px-8 py-4 text-sm text-gray-400 text-center font-bold">Apr 24, 2026</td>
                <td className="px-8 py-4 text-right font-black text-navy">$1,200.00</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
