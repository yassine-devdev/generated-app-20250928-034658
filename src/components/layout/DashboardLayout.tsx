import React, { useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { RightSidebar } from './RightSidebar';
import { Header } from './Header';
import { SubnavLeft } from './SubnavLeft';
import { Footer } from './Footer';
import { OverlayWindowManager } from './OverlayWindowManager';
import { useDashboardStore } from '@/store/dashboardStore';
import { useAuthStore } from '@/store/authStore';
export function DashboardLayout() {
  const currentRole = useDashboardStore((state) => state.currentRole);
  const user = useAuthStore((state) => state.user);
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    if (!user) {
      navigate('/');
    }
  }, [user, navigate]);
  if (!user) {
    return null;
  }
  return (
    <div className="flex h-screen w-screen overflow-hidden relative">
      <main className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <div className="flex flex-1 overflow-hidden">
          <SubnavLeft />
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
            <AnimatePresence mode="wait">
              <Outlet key={location.pathname} />
            </AnimatePresence>
          </div>
        </div>
        {currentRole === 'Owner' && <Footer />}
      </main>
      <RightSidebar />
      {currentRole === 'Owner' && <OverlayWindowManager />}
    </div>
  );
}