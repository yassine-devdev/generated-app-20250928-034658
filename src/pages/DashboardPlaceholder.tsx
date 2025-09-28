import React from 'react';
import { useLocation } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { motion } from 'framer-motion';
export function DashboardPlaceholder() {
  const location = useLocation();
  const pathParts = location.pathname.split('/').filter(Boolean);
  const pageName = pathParts.length > 0 ? pathParts[pathParts.length - 1].replace(/-/g, ' ') : 'Dashboard';
  const capitalizedPageName = pageName.charAt(0).toUpperCase() + pageName.slice(1);
  return (
    <motion.div
      key={location.pathname}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="w-full h-full flex items-center justify-center"
    >
      <Card className="w-full max-w-2xl text-center glass-pane">
        <CardHeader>
          <CardTitle className="text-3xl font-display text-primary">{capitalizedPageName}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            This is a placeholder page for the <span className="text-foreground font-semibold">{capitalizedPageName}</span> section.
          </p>
          <p className="text-sm text-muted-foreground/50 mt-4">
            Full content and functionality will be implemented in a future phase.
          </p>
          <p className="text-xs text-muted-foreground/30 mt-8">
            Current Path: {location.pathname}
          </p>
        </CardContent>
      </Card>
    </motion.div>
  );
}