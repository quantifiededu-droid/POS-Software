import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Button, Input } from '../components/UI';
import { ClemtrixLogo } from '../components/Branding';
import { useStore } from '../store/useStore';
import { motion } from 'motion/react';

export default function Onboarding() {
  const navigate = useNavigate();
  const { setOnboarded, setBusiness, setUser } = useStore();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    businessName: '',
    ownerName: '',
    email: '',
    phone: '',
    address: '',
    pin: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('http://localhost:3000/api/onboard', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          business: {
            name: formData.businessName,
            ownerName: formData.ownerName,
            email: formData.email,
            phone: formData.phone,
            address: formData.address,
          },
          owner: {
            fullName: formData.ownerName,
            email: formData.email,
            phone: formData.phone,
            pin: formData.pin,
          },
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Onboarding failed');
      }

      const business = data.business;
      const user = data.owner || data.user;

      if (!business || !user) {
        throw new Error('Server did not return business and owner details.');
      }

      localStorage.setItem('business', JSON.stringify(business));
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('isOnboarded', 'true');

      if (data.token) {
        localStorage.setItem('token', data.token);
      }

      setBusiness(business);
      setUser(user);
      setOnboarded(true);

      navigate('/dashboard', { replace: true });
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-navy flex items-center justify-center p-8">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-2xl"
      >
        <div className="mb-12 text-center">
          <ClemtrixLogo className="h-12 justify-center mb-4" />
          <h2 className="text-white text-3xl font-bold">
            Welcome to Clemtrix Technologies
          </h2>
          <p className="text-white/60">
            Let&apos;s get your business set up in seconds.
          </p>
        </div>

        <Card className="p-10">
          <form onSubmit={handleSubmit} className="space-y-8">
            {error && (
              <div className="rounded-xl bg-red-50 border border-red-200 text-red-700 px-4 py-3 text-sm">
                {error}
              </div>
            )}

            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-6">
                <h3 className="font-bold text-lg text-navy border-b pb-2">
                  Business Profile
                </h3>

                <Input
                  label="Business Name"
                  placeholder="e.g. Clemtrix Solutions"
                  required
                  value={formData.businessName}
                  onChange={(e) =>
                    setFormData({ ...formData, businessName: e.target.value })
                  }
                />

                <Input
                  label="Business Address"
                  placeholder="Main St, City"
                  value={formData.address}
                  onChange={(e) =>
                    setFormData({ ...formData, address: e.target.value })
                  }
                />
              </div>

              <div className="space-y-6">
                <h3 className="font-bold text-lg text-navy border-b pb-2">
                  Owner Profile
                </h3>

                <Input
                  label="Full Name"
                  placeholder="Your name"
                  required
                  value={formData.ownerName}
                  onChange={(e) =>
                    setFormData({ ...formData, ownerName: e.target.value })
                  }
                />

                <Input
                  label="Email Address"
                  type="email"
                  placeholder="owner@example.com"
                  required
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6 items-end">
              <Input
                label="Phone Number"
                placeholder="+233 24 000 0000"
                required
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
              />

              <Input
                label="Owner Login PIN (4 digits)"
                type="password"
                maxLength={4}
                pattern="\d{4}"
                placeholder="****"
                required
                value={formData.pin}
                onChange={(e) =>
                  setFormData({ ...formData, pin: e.target.value })
                }
              />
            </div>

            <Button
              type="submit"
              className="w-full h-14 text-lg"
              disabled={loading}
            >
              {loading ? 'Setting up...' : 'Finalize & Launch Application'}
            </Button>
          </form>
        </Card>
      </motion.div>
    </div>
  );
}
