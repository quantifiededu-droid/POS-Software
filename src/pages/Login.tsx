import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Button, Input } from '../components/UI';
import { ClemtrixLogo } from '../components/Branding';
import { useStore } from '../store/useStore';
import { motion, AnimatePresence } from 'motion/react';
import { UserCheck } from 'lucide-react';

export default function Login() {
  const navigate = useNavigate();
  const { setBusiness, setUser } = useStore();
  const [users, setUsers] = useState<any[]>([]);
  const [selectedUser, setSelectedUser] = useState<any | null>(null);
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // In a real app, we'd need the business ID from somewhere if multiple businesses existed.
    // For local POS, we just fetch the only business.
    // We'll mock fetching all active users here.
    const fetchUsers = async () => {
      // In a real app, since we're local, we might check local storage for last business ID
      const storage = localStorage.getItem('clemtrix-storage');
      if (storage) {
        const { state } = JSON.parse(storage);
        if (state.business?.id) {
          const res = await fetch(`/api/users/${state.business.id}`);
          const data = await res.json();
          setUsers(data);
        }
      }
    };
    fetchUsers();
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedUser) return;
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: selectedUser.id, pin }),
      });

      const data = await res.json();
      if (data.success) {
        setBusiness(data.business);
        setUser(data.user);
        navigate('/');
      } else {
        setError('Invalid PIN. Please try again.');
        setPin('');
      }
    } catch (err) {
      setError('Connection failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-navy flex items-center justify-center p-8">
      <div className="w-full max-w-md text-center">
        <ClemtrixLogo className="h-12 justify-center mb-12" />
        
        <AnimatePresence mode="wait">
          {!selectedUser ? (
            <motion.div
              key="user-select"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <h2 className="text-white text-2xl font-bold mb-8">Select User</h2>
              <div className="space-y-4 text-left">
                {users.length > 0 ? users.map((user) => (
                  <button
                    key={user.id}
                    onClick={() => setSelectedUser(user)}
                    className="w-full bg-white/10 hover:bg-white/20 p-4 rounded-2xl flex items-center gap-4 transition-all group"
                  >
                    <div className="w-12 h-12 rounded-full bg-gold/20 flex items-center justify-center text-gold font-bold text-lg group-hover:scale-110 transition-transform">
                      {user.full_name.charAt(0)}
                    </div>
                    <div className="flex-1">
                      <p className="text-white font-bold">{user.full_name}</p>
                      <p className="text-white/50 text-sm capitalize">{user.role}</p>
                    </div>
                  </button>
                )) : (
                  <p className="text-white/50 text-center py-4">No users found. Please restart onboarding.</p>
                )}
              </div>
              <button 
                onClick={() => navigate('/onboarding')}
                className="mt-8 text-gold font-medium hover:underline"
              >
                Onboard New Business
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="pin-entry"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <button 
                onClick={() => setSelectedUser(null)}
                className="text-white/50 text-sm mb-8 hover:text-white transition-colors"
              >
                ← Back to User Selection
              </button>
              
              <Card className="text-left">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 rounded-full bg-navy/5 flex items-center justify-center text-navy font-bold text-lg">
                    {selectedUser.full_name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-navy font-bold text-lg leading-tight">{selectedUser.full_name}</p>
                    <p className="text-gray-500 text-sm capitalize font-medium">{selectedUser.role}</p>
                  </div>
                </div>

                <form onSubmit={handleLogin} className="space-y-6">
                  <Input 
                    label="Enter Unlock PIN" 
                    type="password" 
                    maxLength={4} 
                    autoFocus
                    placeholder="****"
                    error={error}
                    value={pin}
                    onChange={e => {
                      setPin(e.target.value);
                      if (e.target.value.length === 4) {
                        // Auto submit logic could go here
                      }
                    }}
                  />
                  <Button type="submit" className="w-full h-14" disabled={loading || pin.length < 4}>
                    {loading ? 'Unlocking...' : 'Unlock System'}
                  </Button>
                </form>
                
                <p className="mt-6 text-center text-xs text-gray-400 font-medium">
                  Forgot PIN? Contact system owner for reset.
                </p>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
