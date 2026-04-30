import React, { useState, useEffect } from 'react';
import { Card, Button, Input } from '../components/UI';
import { 
  Users, 
  Plus, 
  Shield, 
  Eye, 
  UserPlus, 
  ToggleLeft, 
  Key,
  Mail,
  Phone
} from 'lucide-react';
import { useStore } from '../store/useStore';

export default function Staff() {
  const { business } = useStore();
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    if (business?.id) {
      fetch(`/api/users/${business.id}`)
        .then(res => res.json())
        .then(data => setUsers(data));
    }
  }, [business?.id]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-black text-navy tracking-tight">Staff Management</h2>
          <p className="text-gray-500 font-medium font-serif italic text-sm">Oversee your shopkeepers and access permissions.</p>
        </div>
        <Button className="flex items-center gap-2">
          <UserPlus size={20} />
          <span>Add New Staff</span>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {users.map(u => (
          <Card key={u.id} className="relative overflow-hidden group hover:border-gold transition-all">
            <div className="absolute top-0 right-0 p-4">
              <span className={`px-2 py-1 rounded-md text-[10px] font-black uppercase border ${
                u.role === 'owner' ? 'bg-gold/10 text-gold border-gold/20' : 'bg-blue-50 text-blue-500 border-blue-100'
              }`}>
                {u.role}
              </span>
            </div>
            
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-2xl bg-gray-100 flex items-center justify-center text-2xl font-black text-gray-400">
                {u.full_name.charAt(0)}
              </div>
              <div>
                <h3 className="font-bold text-navy truncate pr-16">{u.full_name}</h3>
                <p className="text-xs text-gray-400 font-medium font-mono uppercase">ID: #{u.id.slice(0, 6)}</p>
              </div>
            </div>

            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Mail size={14} />
                <span className="truncate">{u.email || 'N/A'}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Phone size={14} />
                <span>{u.phone || 'N/A'}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <button className="flex items-center justify-center gap-2 py-2.5 rounded-xl bg-gray-50 text-navy text-xs font-bold hover:bg-gray-100 transition-all">
                <Eye size={14} />
                <span>Profile</span>
              </button>
              <button className="flex items-center justify-center gap-2 py-2.5 rounded-xl bg-gray-50 text-navy text-xs font-bold hover:bg-gray-100 transition-all">
                <Key size={14} />
                <span>Reset PIN</span>
              </button>
            </div>
            
            {u.role !== 'owner' && (
              <button className="w-full mt-2 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-red-50 text-red-500 text-xs font-bold hover:bg-red-100 transition-all">
                <ToggleLeft size={14} />
                <span>Deactivate Staff</span>
              </button>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
}
