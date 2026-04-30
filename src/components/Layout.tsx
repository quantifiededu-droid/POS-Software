import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  ShoppingCart, 
  Package, 
  History, 
  Users, 
  BarChart3, 
  Wallet, 
  MessageSquare, 
  Bell, 
  Settings,
  LogOut
} from 'lucide-react';
import { ClemtrixLogo, BusinessName } from './Branding';
import { useStore } from '../store/useStore';
import { motion } from 'motion/react';

const navItems = [
  { path: '/', icon: LayoutDashboard, label: 'Dashboard' },
  { path: '/pos', icon: ShoppingCart, label: 'POS' },
  { path: '/products', icon: Package, label: 'Products' },
  { path: '/inventory', icon: History, label: 'Inventory' },
  { path: '/staff', icon: Users, label: 'Staff' },
  { path: '/reports', icon: BarChart3, label: 'Reports' },
  { path: '/expenses', icon: Wallet, label: 'Expenses' },
  { path: '/chat', icon: MessageSquare, label: 'Chat' },
  { path: '/alerts', icon: Bell, label: 'Alerts' },
  { path: '/settings', icon: Settings, label: 'Settings' },
];

export const Layout = ({ children }: { children: React.ReactNode }) => {
  const { business, user, logout } = useStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="flex h-screen bg-background overflow-hidden outline-none">
      {/* Sidebar */}
      <aside className="w-[240px] bg-navy flex flex-col shrink-0">
        <div className="p-6 mb-6">
          <ClemtrixLogo />
        </div>
        
        <nav className="flex-1 px-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => `
                flex items-center gap-3 px-4 py-3 rounded-lg font-medium text-[14px] transition-all duration-200
                ${isActive 
                  ? 'bg-gold/10 text-gold shadow-none' 
                  : 'text-white/70 hover:bg-white/5 hover:text-white'}
              `}
            >
              <item.icon size={18} />
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="p-6 pt-4 border-t border-white/5">
          <div className="bg-white/5 p-4 rounded-xl mb-4">
            <p className="text-white/50 text-[11px] uppercase tracking-wider mb-1">Current User</p>
            <p className="text-white text-sm font-semibold truncate">{user?.full_name}</p>
            <p className="text-gold text-[10px] font-bold uppercase">{user?.role === 'owner' ? 'System Owner' : 'Shopkeeper'}</p>
          </div>
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-2 p-2 text-white/50 hover:text-red-400 text-xs font-semibold transition-all"
          >
            <LogOut size={16} />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="h-[90px] bg-white border-b border-border-subtle flex items-center justify-between px-8 shrink-0">
          <div>
            <BusinessName name={business?.name || 'Clemtrix POS'} />
            <p className="text-[13px] text-slate-500 font-medium">Location: {business?.address || 'Main Branch'}</p>
          </div>
          
          <div className="flex items-center gap-8">
            <div className="text-right">
              <p className="text-[11px] text-slate-400 uppercase tracking-widest font-black mb-0.5">Live Revenue</p>
              <p className="text-xl font-bold text-navy">$0.00</p>
            </div>
            <div className="h-10 w-[1px] bg-border-subtle" />
            <div className="text-right">
              <p className="text-[11px] text-slate-400 font-bold">{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: '2-digit', year: 'numeric' })}</p>
              <p className="text-sm font-black text-navy">{new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</p>
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-8 bg-[#F8FAFC]">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="max-w-[1400px] mx-auto"
          >
            {children}
          </motion.div>
        </div>
      </main>
    </div>
  );
};
