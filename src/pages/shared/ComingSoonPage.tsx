import React from 'react';
import { useLocation } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { Wrench } from 'lucide-react';
export function ComingSoonPage() {
  const location = useLocation();
  const pathParts = location.pathname.split('/').filter(Boolean);
  const pageName = pathParts.length > 0 ? pathParts[pathParts.length - 1].replace(/-/g, ' ') : 'Feature';
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
          <div className="flex justify-center mb-4">
            <div className="p-4 bg-primary/10 rounded-full">
              <Wrench className="w-8 h-8 text-primary" />
            </div>
          </div>
          <CardTitle className="text-3xl font-display text-primary">Coming Soon!</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            The <span className="text-foreground font-semibold">{capitalizedPageName}</span> feature is currently under construction.
          </p>
          <p className="text-sm text-muted-foreground/50 mt-2">
            We're working hard to bring you this new functionality. Stay tuned!
          </p>
        </CardContent>
      </Card>
    </motion.div>
  );
}