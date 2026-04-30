import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import { useStore } from './store/useStore';

// Lazy load pages for better performance
const Dashboard = React.lazy(() => import('./pages/Dashboard'));
const POS = React.lazy(() => import('./pages/POS'));
const Products = React.lazy(() => import('./pages/Products'));
const Inventory = React.lazy(() => import('./pages/Inventory'));
const Staff = React.lazy(() => import('./pages/Staff'));
const Reports = React.lazy(() => import('./pages/Reports'));
const Expenses = React.lazy(() => import('./pages/Expenses'));
const Chat = React.lazy(() => import('./pages/Chat'));
const Alerts = React.lazy(() => import('./pages/Alerts'));
const Settings = React.lazy(() => import('./pages/Settings'));
const Login = React.lazy(() => import('./pages/Login'));
const Onboarding = React.lazy(() => import('./pages/Onboarding'));

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, business, isOnboarded } = useStore();
  if (!isOnboarded) return <Navigate to="/onboarding" replace />;
  if (!user || !business) return <Navigate to="/login" replace />;
  return <Layout>{children}</Layout>;
};

export default function App() {
  const { isOnboarded } = useStore();

  return (
    <BrowserRouter>
      <React.Suspense fallback={
        <div className="h-screen w-screen flex items-center justify-center bg-navy">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gold" />
        </div>
      }>
        <Routes>
          <Route path="/onboarding" element={!isOnboarded ? <Onboarding /> : <Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          
          <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/pos" element={<ProtectedRoute><POS /></ProtectedRoute>} />
          <Route path="/products" element={<ProtectedRoute><Products /></ProtectedRoute>} />
          <Route path="/inventory" element={<ProtectedRoute><Inventory /></ProtectedRoute>} />
          <Route path="/staff" element={<ProtectedRoute><Staff /></ProtectedRoute>} />
          <Route path="/reports" element={<ProtectedRoute><Reports /></ProtectedRoute>} />
          <Route path="/expenses" element={<ProtectedRoute><Expenses /></ProtectedRoute>} />
          <Route path="/chat" element={<ProtectedRoute><Chat /></ProtectedRoute>} />
          <Route path="/alerts" element={<ProtectedRoute><Alerts /></ProtectedRoute>} />
          <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </React.Suspense>
    </BrowserRouter>
  );
}
