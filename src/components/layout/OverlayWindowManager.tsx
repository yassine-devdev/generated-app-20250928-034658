import React from 'react';
import { useOverlayStore } from '@/store/overlayStore';
import { AppWindow } from './AppWindow';
import { AnimatePresence } from 'framer-motion';
import { useShallow } from 'zustand/react/shallow';
export function OverlayWindowManager() {
  const apps = useOverlayStore(useShallow(state => state.apps));
  const visibleApps = apps.filter(app => app.state !== 'minimized');
  return (
    <div className="absolute inset-0 pointer-events-none">
      <AnimatePresence>
        {visibleApps.map(app => (
          <AppWindow key={app.id} app={app} />
        ))}
      </AnimatePresence>
    </div>
  );
}