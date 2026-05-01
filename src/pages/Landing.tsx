import React from 'react';
import { Link } from 'react-router-dom';
import {
  ShoppingCart,
  BarChart3,
  ShieldCheck,
  Users,
  Package,
  ArrowRight,
} from 'lucide-react';

export default function Landing() {
  return (
    <div className="min-h-screen bg-[#0B1120] text-white overflow-hidden">
      {/* NAVBAR */}
      <header className="w-full border-b border-white/10 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold tracking-tight">
            POS<span className="text-yellow-400">Pro</span>
          </h1>

          <div className="flex items-center gap-4">
            <Link
              to="/login"
              className="text-sm hover:text-yellow-400 transition"
            >
              Login
            </Link>

            <Link
              to="/onboarding"
              className="bg-yellow-400 text-black px-5 py-2 rounded-xl font-semibold hover:bg-yellow-300 transition"
            >
              Get Started
            </Link>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="relative">
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/10 via-transparent to-blue-500/10" />

        <div className="max-w-7xl mx-auto px-6 py-24 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* LEFT */}
            <div>
              <div className="inline-flex items-center gap-2 bg-yellow-400/10 border border-yellow-400/20 px-4 py-2 rounded-full text-yellow-300 text-sm mb-6">
                🚀 Smart POS Software for Modern Businesses
              </div>

              <h1 className="text-5xl md:text-6xl font-extrabold leading-tight">
                Run Your Business Like a
                <span className="text-yellow-400"> Pro</span>
              </h1>

              <p className="mt-6 text-lg text-gray-300 leading-relaxed">
                Manage sales, inventory, staff, expenses, analytics,
                and reports in one powerful POS system designed
                for restaurants, retail stores, and modern businesses.
              </p>

              <div className="mt-10 flex flex-wrap gap-4">
                <Link
                  to="/onboarding"
                  className="bg-yellow-400 hover:bg-yellow-300 text-black px-8 py-4 rounded-2xl font-bold flex items-center gap-2 transition"
                >
                  Start Free
                  <ArrowRight size={18} />
                </Link>

                <Link
                  to="/login"
                  className="border border-white/20 hover:border-yellow-400 px-8 py-4 rounded-2xl font-semibold transition"
                >
                  Login
                </Link>
              </div>

              {/* STATS */}
              <div className="grid grid-cols-3 gap-6 mt-14">
                <div>
                  <h2 className="text-3xl font-bold text-yellow-400">24/7</h2>
                  <p className="text-gray-400 text-sm">System Access</p>
                </div>

                <div>
                  <h2 className="text-3xl font-bold text-yellow-400">99%</h2>
                  <p className="text-gray-400 text-sm">Fast Performance</p>
                </div>

                <div>
                  <h2 className="text-3xl font-bold text-yellow-400">Smart</h2>
                  <p className="text-gray-400 text-sm">Analytics</p>
                </div>
              </div>
            </div>

            {/* RIGHT */}
            <div className="relative">
              <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl p-8 shadow-2xl">
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-xl font-bold">Dashboard Preview</h3>

                  <div className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-sm">
                    Live
                  </div>
                </div>

                <div className="space-y-5">
                  <div className="bg-[#121A2B] rounded-2xl p-5">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-400 text-sm">
                          Today's Revenue
                        </p>
                        <h2 className="text-3xl font-bold mt-2">
                          $12,480
                        </h2>
                      </div>

                      <BarChart3
                        className="text-yellow-400"
                        size={42}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-5">
                    <div className="bg-[#121A2B] rounded-2xl p-5">
                      <Package
                        className="text-blue-400 mb-3"
                        size={28}
                      />
                      <h3 className="font-bold text-xl">320</h3>
                      <p className="text-gray-400 text-sm">
                        Products
                      </p>
                    </div>

                    <div className="bg-[#121A2B] rounded-2xl p-5">
                      <Users
                        className="text-green-400 mb-3"
                        size={28}
                      />
                      <h3 className="font-bold text-xl">18</h3>
                      <p className="text-gray-400 text-sm">
                        Staff Members
                      </p>
                    </div>
                  </div>

                  <div className="bg-[#121A2B] rounded-2xl p-5">
                    <div className="flex items-center gap-3">
                      <ShoppingCart
                        className="text-pink-400"
                        size={26}
                      />

                      <div>
                        <h4 className="font-semibold">
                          POS Transactions
                        </h4>

                        <p className="text-sm text-gray-400">
                          1,248 completed today
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* GLOW EFFECT */}
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-yellow-400/20 blur-3xl rounded-full" />
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-blue-500/20 blur-3xl rounded-full" />
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-24 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold">
              Everything You Need
            </h2>

            <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
              Powerful tools to manage and scale your business effortlessly.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard
              icon={<ShoppingCart size={30} />}
              title="POS System"
              description="Fast and reliable checkout experience."
            />

            <FeatureCard
              icon={<Package size={30} />}
              title="Inventory"
              description="Track stock and manage products easily."
            />

            <FeatureCard
              icon={<Users size={30} />}
              title="Staff Control"
              description="Manage staff permissions and activity."
            />

            <FeatureCard
              icon={<ShieldCheck size={30} />}
              title="Secure Data"
              description="Enterprise-grade security and protection."
            />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-6">
          <div className="bg-gradient-to-r from-yellow-400 to-yellow-300 rounded-3xl p-12 text-center text-black">
            <h2 className="text-4xl font-extrabold">
              Ready to Grow Your Business?
            </h2>

            <p className="mt-4 text-lg opacity-80">
              Start using the smartest POS software today.
            </p>

            <Link
              to="/onboarding"
              className="inline-flex items-center gap-2 mt-8 bg-black text-white px-8 py-4 rounded-2xl font-bold hover:opacity-90 transition"
            >
              Get Started
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/10 py-8 text-center text-gray-500 text-sm">
        © 2026 POSPro. All rights reserved.
      </footer>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-3xl p-8 hover:border-yellow-400/40 transition">
      <div className="text-yellow-400 mb-5">{icon}</div>

      <h3 className="text-xl font-bold mb-3">
        {title}
      </h3>

      <p className="text-gray-400 leading-relaxed">
        {description}
      </p>
    </div>
  );
}
