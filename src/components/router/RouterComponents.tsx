import React, { useEffect } from 'react';
import {
  useLocation,
  useNavigate,
  Outlet,
} from "react-router-dom";
import { AnimatePresence } from 'framer-motion';
import { useDashboardStore } from '@/store/dashboardStore';
export function AnimatedOutlet() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Outlet key={location.pathname} />
    </AnimatePresence>
  );
}
export function RouterContextWrapper({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { currentRole, setNavigationFromPath } = useDashboardStore();
  useEffect(() => {
    if (location.pathname.startsWith('/dashboard') && !currentRole) {
      navigate('/');
    }
  }, [currentRole, location.pathname, navigate]);
  useEffect(() => {
    if (location.pathname.startsWith('/dashboard')) {
      setNavigationFromPath(location.pathname);
    }
  }, [location.pathname, setNavigationFromPath]);
  return <>{children}</>;
}