import React from 'react';
import { Card, Button } from '../components/UI';
import { 
  BarChart3, 
  Calendar, 
  Download, 
  TrendingUp, 
  CreditCard, 
  ArrowUpRight,
  PieChart as PieChartIcon
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';

const data = [
  { name: 'Mon', revenue: 4000, expenses: 2400 },
  { name: 'Tue', revenue: 3000, expenses: 1398 },
  { name: 'Wed', revenue: 2000, expenses: 9800 },
  { name: 'Thu', revenue: 2780, expenses: 3908 },
  { name: 'Fri', revenue: 1890, expenses: 4800 },
  { name: 'Sat', revenue: 2390, expenses: 3800 },
  { name: 'Sun', revenue: 3490, expenses: 4300 },
];

const COLORS = ['#0D1B2A', '#F5A623', '#3B82F6', '#10B981'];

export default function Reports() {
  return (
    <div className="space-y-8 pb-10">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-black text-navy tracking-tight">Business Reports</h2>
          <p className="text-gray-500 font-medium font-serif italic text-sm">Deep insights into your revenue and sales performance.</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-6 py-3 bg-white border border-gray-200 rounded-xl text-navy font-bold hover:bg-gray-50 transition-all">
            <Calendar size={20} />
            <span>Apr 1, 2026 - Apr 30, 2026</span>
          </button>
          <Button className="flex items-center gap-2">
            <Download size={20} />
            <span>Export PDF</span>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-6">
        {[
          { label: 'Total Revenue', value: '$45,230', change: '+12.5%', color: 'text-green-500' },
          { label: 'Total Expenses', value: '$12,400', change: '+3.2%', color: 'text-red-400' },
          { label: 'Net Profit', value: '$32,830', change: '+18.1%', color: 'text-green-500' },
          { label: 'Transactions', value: '1,420', change: '+5.4%', color: 'text-blue-500' },
        ].map((stat, i) => (
          <Card key={i} className="p-8 group hover:border-gold transition-all">
            <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-2">{stat.label}</p>
            <div className="flex items-end justify-between">
              <h3 className="text-3xl font-black text-navy">{stat.value}</h3>
              <span className={`text-xs font-bold ${stat.color} flex items-center gap-1`}>
                <ArrowUpRight size={14} />
                {stat.change}
              </span>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-6">
        <Card className="col-span-2 p-8 h-96 flex flex-col">
          <div className="flex items-center justify-between mb-8">
            <h3 className="font-bold text-lg text-navy">Revenue vs Expenses</h3>
            <div className="flex gap-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-navy" />
                <span className="text-xs font-bold text-gray-400 uppercase">Revenue</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-gold" />
                <span className="text-xs font-bold text-gray-400 uppercase">Expenses</span>
              </div>
            </div>
          </div>
          <div className="flex-1">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f1f1" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fontWeight: 600, fill: '#cbd5e1' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fontWeight: 600, fill: '#cbd5e1' }} />
                <Tooltip />
                <Line type="monotone" dataKey="revenue" stroke="#0D1B2A" strokeWidth={4} dot={{ r: 4, fill: '#0D1B2A', strokeWidth: 0 }} activeDot={{ r: 8 }} />
                <Line type="monotone" dataKey="expenses" stroke="#F5A623" strokeWidth={4} dot={{ r: 4, fill: '#F5A623', strokeWidth: 0 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-8 h-96 flex flex-col">
          <h3 className="font-bold text-lg text-navy mb-8">Sales by Payment Method</h3>
          <div className="flex-1">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={[
                    { name: 'Cash', value: 400 },
                    { name: 'Card', value: 300 },
                    { name: 'Mobile', value: 300 },
                  ]}
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  <Cell fill="#0D1B2A" />
                  <Cell fill="#F5A623" />
                  <Cell fill="#3B82F6" />
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-3 gap-2 mt-4">
             {['Cash', 'Card', 'Mobile'].map((m, i) => (
               <div key={m} className="text-center">
                 <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none mb-1">{m}</p>
                 <div className="h-1 rounded-full overflow-hidden bg-gray-100">
                    <div className="h-full rounded-full" style={{ width: i === 0 ? '70%' : '50%', backgroundColor: COLORS[i] }} />
                 </div>
               </div>
             ))}
          </div>
        </Card>
      </div>

      <Card className="p-0 overflow-hidden">
        <div className="p-8 border-b border-gray-100">
          <h3 className="font-bold text-lg text-navy">Top Performing Products</h3>
        </div>
        <div className="p-8">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={[
                { name: 'Product A', sales: 400 },
                { name: 'Product B', sales: 300 },
                { name: 'Product C', sales: 200 },
                { name: 'Product D', sales: 150 },
                { name: 'Product E', sales: 100 },
              ]} layout="vertical" margin={{ left: 40 }}>
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fontSize: 12, fontWeight: 700, fill: '#0D1B2A' }} />
                <Tooltip />
                <Bar dataKey="sales" fill="#0D1B2A" radius={[0, 4, 4, 0]} barSize={24} />
              </BarChart>
            </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
}
