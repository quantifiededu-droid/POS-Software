import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../components/UI';
import { 
  TrendingUp, 
  Users, 
  AlertTriangle, 
  Calendar,
  ArrowUpRight,
  ShoppingCart
} from 'lucide-react';
import { useStore } from '../store/useStore';
import { ClemtrixLogo } from '../components/Branding';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer,
  CartesianGrid 
} from 'recharts';

export default function Dashboard() {
  const navigate = useNavigate();
  const { business } = useStore();
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    if (business?.id) {
      fetch(`/api/dashboard/${business.id}`)
        .then(res => res.json())
        .then(data => setStats(data));
    }
  }, [business?.id]);

  if (!stats) return <div className="h-64 flex items-center justify-center"><div className="animate-spin rounded-full h-8 w-8 border-t-2 border-gold" /></div>;

  const statCards = [
    { title: "Today's Sales", value: `$${(stats.todaySales || 0).toLocaleString()}`, icon: TrendingUp, color: "text-green-500", bg: "bg-green-50" },
    { title: "Total Transactions", value: stats.totalTransactions || 0, icon: ShoppingCart, color: "text-blue-500", bg: "bg-blue-50" },
    { title: "Low Stock Items", value: stats.lowStockCount || 0, icon: AlertTriangle, color: "text-amber-500", bg: "bg-amber-50" },
    { title: "Pending Expiries", value: "0", icon: Calendar, color: "text-red-500", bg: "bg-red-50" },
  ];

  return (
    <div className="space-y-8">
      {/* Stat Bar */}
      <div className="grid grid-cols-4 gap-5">
        {statCards.map((stat, i) => (
          <Card key={i} className="flex flex-col gap-4 p-5">
            <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest leading-none">{stat.title}</p>
            <div className="flex items-center justify-between">
              <p className={cn("text-2xl font-black text-navy", stat.title === 'Low Stock Items' && 'text-gold')}>{stat.value}</p>
              <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center shrink-0", stat.bg, stat.color)}>
                <stat.icon size={20} />
              </div>
            </div>
            {i === 0 && <p className="text-[10px] text-green-600 font-bold uppercase tracking-tight">↑ 12% from yesterday</p>}
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Sales Chart */}
        <Card className="col-span-2 overflow-hidden flex flex-col p-8">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-bold text-navy">Sales Last 7 Days</h3>
            <div className="flex items-center gap-2 text-green-500 text-sm font-bold">
              <ArrowUpRight size={16} />
              <span>+12.5% from last week</span>
            </div>
          </div>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stats.salesHistory}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                <XAxis 
                  dataKey="date" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 12, fontWeight: 600, fill: '#64748B' }}
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 12, fontWeight: 600, fill: '#64748B' }}
                />
                <Tooltip 
                  cursor={{ fill: '#F5A62310' }}
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                />
                <Bar 
                  dataKey="total" 
                  fill="#F5A623" 
                  radius={[6, 6, 0, 0]} 
                  barSize={40}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Quick Actions */}
        <div className="space-y-6">
          <Card className="p-8">
            <h3 className="text-lg font-bold text-navy mb-6">Quick Actions</h3>
            <div className="grid grid-cols-1 gap-3">
              <button 
                onClick={() => navigate('/pos')}
                className="flex items-center justify-center gap-3 p-4 bg-navy rounded-lg text-white font-bold hover:bg-navy/90 transition-all active:scale-95 w-full"
              >
                <ShoppingCart size={18} />
                <span>Create New Sale (Ctrl+N)</span>
              </button>
              <button 
                onClick={() => navigate('/products')}
                className="flex items-center justify-center gap-3 p-4 bg-white border border-navy rounded-lg text-navy font-bold hover:bg-navy hover:text-white transition-all active:scale-95 w-full"
              >
                <TrendingUp size={18} />
                <span>Add New Product</span>
              </button>
              <button 
                onClick={() => navigate('/inventory')}
                className="flex items-center justify-center gap-3 p-4 bg-white border border-navy rounded-lg text-navy font-bold hover:bg-navy hover:text-white transition-all active:scale-95 w-full"
              >
                <ArrowUpRight size={18} />
                <span>Restock Inventory</span>
              </button>
            </div>
          </Card>
          
          <Card className="p-8 bg-navy text-white relative h-full overflow-hidden">
            <div className="relative z-10">
              <h3 className="text-lg font-bold mb-2">System Status</h3>
              <p className="text-white/60 text-sm mb-6">Your Clemtrix POS node is running perfectly.</p>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-xs font-bold uppercase tracking-widest bg-white/10 px-2 py-1 rounded">Sync: Live</span>
              </div>
            </div>
            <div className="absolute top-[-20%] right-[-10%] opacity-10 rotate-12">
              <ClemtrixLogo className="h-48" />
            </div>
          </Card>
        </div>
      </div>

      {/* Recent Transactions */}
      <Card className="p-0 overflow-hidden">
        <div className="p-8 border-b border-gray-100 flex items-center justify-between">
          <h3 className="text-xl font-bold text-navy">Recent Transactions</h3>
          <button className="text-gold font-bold text-sm hover:underline">View All Sales</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-border-subtle">
                <th className="px-8 py-4 text-[11px] font-black text-slate-400 uppercase tracking-widest">Transaction ID</th>
                <th className="px-8 py-4 text-[11px] font-black text-slate-400 uppercase tracking-widest">Date & Time</th>
                <th className="px-8 py-4 text-[11px] font-black text-slate-400 uppercase tracking-widest">Cashier</th>
                <th className="px-8 py-4 text-[11px] font-black text-slate-400 uppercase tracking-widest text-center">Payment</th>
                <th className="px-8 py-4 text-[11px] font-black text-slate-400 uppercase tracking-widest text-right">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F8FAFC]">
              {stats.recentSales?.length > 0 ? stats.recentSales.map((sale: any) => (
                <tr key={sale.id} className="hover:bg-[#F8FAFC] transition-colors">
                  <td className="px-8 py-4 text-[13px] font-bold text-navy uppercase tracking-tight">#{sale.id.slice(0, 8)}</td>
                  <td className="px-8 py-4 text-slate-500 text-[13px] font-medium">{new Date(sale.created_at).toLocaleString()}</td>
                  <td className="px-8 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-gold/10 flex items-center justify-center text-[10px] text-gold font-black">
                        {sale.cashier.charAt(0)}
                      </div>
                      <span className="text-[13px] font-bold text-navy">{sale.cashier}</span>
                    </div>
                  </td>
                  <td className="px-8 py-4 text-center">
                    <span className="text-[11px] font-black text-slate-400 uppercase tracking-widest">{sale.payment_method}</span>
                  </td>
                  <td className="px-8 py-4 text-right text-[13px] font-black text-navy">${sale.total_amount.toLocaleString()}</td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={5} className="px-8 py-12 text-center text-gray-400 font-medium font-serif italic text-lg">
                    No transactions recorded yet.
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
