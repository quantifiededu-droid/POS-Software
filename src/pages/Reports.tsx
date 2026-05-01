import React from 'react';
import { Card, Button } from '../components/UI';
import {
  Calendar,
  Download,
  ArrowUpRight,
  TrendingUp,
  Wallet,
  ShoppingCart,
  DollarSign,
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
  Cell,
} from 'recharts';

const revenueData = [
  { name: 'Mon', revenue: 4000, expenses: 2400 },
  { name: 'Tue', revenue: 3000, expenses: 1398 },
  { name: 'Wed', revenue: 2000, expenses: 1800 },
  { name: 'Thu', revenue: 2780, expenses: 1908 },
  { name: 'Fri', revenue: 4890, expenses: 2800 },
  { name: 'Sat', revenue: 6390, expenses: 3800 },
  { name: 'Sun', revenue: 7490, expenses: 4300 },
];

const paymentData = [
  { name: 'Cash', value: 45 },
  { name: 'Card', value: 35 },
  { name: 'Mobile', value: 20 },
];

const topProducts = [
  { name: 'Premium Coffee', sales: 400 },
  { name: 'Energy Drink', sales: 320 },
  { name: 'Chocolate Cookies', sales: 260 },
  { name: 'Soft Bread', sales: 180 },
  { name: 'Fruit Juice', sales: 120 },
];

const COLORS = ['#0D1B2A', '#F5A623', '#3B82F6'];

export default function Reports() {
  const statCards = [
    {
      label: 'Total Revenue',
      value: '$45,230',
      change: '+12.5%',
      icon: DollarSign,
      color: 'text-green-500',
      bg: 'bg-green-50',
    },
    {
      label: 'Expenses',
      value: '$12,400',
      change: '+3.2%',
      icon: Wallet,
      color: 'text-red-400',
      bg: 'bg-red-50',
    },
    {
      label: 'Net Profit',
      value: '$32,830',
      change: '+18.1%',
      icon: TrendingUp,
      color: 'text-green-500',
      bg: 'bg-green-50',
    },
    {
      label: 'Transactions',
      value: '1,420',
      change: '+5.4%',
      icon: ShoppingCart,
      color: 'text-blue-500',
      bg: 'bg-blue-50',
    },
  ];

  return (
    <div className="space-y-8 pb-10">
      {/* Header */}
      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-black text-navy tracking-tight">
            Business Reports
          </h2>

          <p className="text-gray-500 font-medium italic text-sm">
            Deep insights into your sales, expenses, and business growth.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <button className="flex items-center justify-center gap-2 px-6 py-3 bg-white border border-gray-200 rounded-xl text-navy font-bold hover:bg-gray-50 transition-all">
            <Calendar size={20} />
            <span>Apr 1, 2026 - Apr 30, 2026</span>
          </button>

          <Button className="flex items-center gap-2">
            <Download size={20} />
            <span>Export PDF</span>
          </Button>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        {statCards.map((stat, i) => (
          <Card
            key={i}
            className="p-8 group hover:border-gold transition-all"
          >
            <div className="flex items-start justify-between mb-6">
              <div>
                <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-2">
                  {stat.label}
                </p>

                <h3 className="text-3xl font-black text-navy">
                  {stat.value}
                </h3>
              </div>

              <div
                className={`w-12 h-12 rounded-2xl flex items-center justify-center ${stat.bg} ${stat.color}`}
              >
                <stat.icon size={22} />
              </div>
            </div>

            <div
              className={`text-xs font-bold ${stat.color} flex items-center gap-1`}
            >
              <ArrowUpRight size={14} />
              {stat.change}
            </div>
          </Card>
        ))}
      </div>

      {/* Main Charts */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Revenue */}
        <Card className="xl:col-span-2 p-8 h-[420px] flex flex-col">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="font-bold text-xl text-navy">
                Revenue vs Expenses
              </h3>

              <p className="text-sm text-gray-400 mt-1">
                Weekly financial performance
              </p>
            </div>

            <div className="flex gap-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-navy" />

                <span className="text-xs font-bold text-gray-400 uppercase">
                  Revenue
                </span>
              </div>

              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-gold" />

                <span className="text-xs font-bold text-gray-400 uppercase">
                  Expenses
                </span>
              </div>
            </div>
          </div>

          <div className="flex-1">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={revenueData}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#f1f5f9"
                />

                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{
                    fontSize: 12,
                    fontWeight: 700,
                    fill: '#94A3B8',
                  }}
                />

                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{
                    fontSize: 12,
                    fontWeight: 700,
                    fill: '#94A3B8',
                  }}
                />

                <Tooltip />

                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="#0D1B2A"
                  strokeWidth={4}
                  dot={{
                    r: 4,
                    fill: '#0D1B2A',
                    strokeWidth: 0,
                  }}
                  activeDot={{ r: 8 }}
                />

                <Line
                  type="monotone"
                  dataKey="expenses"
                  stroke="#F5A623"
                  strokeWidth={4}
                  dot={{
                    r: 4,
                    fill: '#F5A623',
                    strokeWidth: 0,
                  }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Payment Methods */}
        <Card className="p-8 h-[420px] flex flex-col">
          <div>
            <h3 className="font-bold text-xl text-navy">
              Payment Methods
            </h3>

            <p className="text-sm text-gray-400 mt-1">
              Distribution of customer payments
            </p>
          </div>

          <div className="flex-1">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={paymentData}
                  innerRadius={65}
                  outerRadius={90}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {paymentData.map((_, i) => (
                    <Cell key={i} fill={COLORS[i]} />
                  ))}
                </Pie>

                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-3">
            {paymentData.map((method, i) => (
              <div
                key={method.name}
                className="flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: COLORS[i] }}
                  />

                  <span className="font-bold text-sm text-navy">
                    {method.name}
                  </span>
                </div>

                <span className="text-sm font-black text-gray-400">
                  {method.value}%
                </span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Top Products */}
      <Card className="p-0 overflow-hidden">
        <div className="p-8 border-b border-gray-100">
          <h3 className="font-bold text-xl text-navy">
            Top Performing Products
          </h3>

          <p className="text-sm text-gray-400 mt-1">
            Highest selling items this month
          </p>
        </div>

        <div className="p-8">
          <ResponsiveContainer width="100%" height={320}>
            <BarChart
              data={topProducts}
              layout="vertical"
              margin={{ left: 40 }}
            >
              <XAxis type="number" hide />

              <YAxis
                dataKey="name"
                type="category"
                axisLine={false}
                tickLine={false}
                tick={{
                  fontSize: 12,
                  fontWeight: 700,
                  fill: '#0D1B2A',
                }}
              />

              <Tooltip />

              <Bar
                dataKey="sales"
                fill="#0D1B2A"
                radius={[0, 6, 6, 0]}
                barSize={28}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
}
