import React from 'react';
import { LucideIcon } from 'lucide-react';
import { motion } from 'framer-motion';
interface PlaceholderAppProps {
  appName: string;
  icon: LucideIcon;
}
export function PlaceholderApp({ appName, icon: Icon }: PlaceholderAppProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full h-full flex flex-col items-center justify-center text-center p-8 rounded-lg bg-zinc-900/30 border border-dashed border-white/10"
    >
      <Icon className="w-16 h-16 text-primary mb-6" />
      <h2 className="text-4xl font-display font-bold text-foreground">
        {appName} App
      </h2>
      <p className="mt-2 text-lg text-muted-foreground max-w-md">
        This is a placeholder for the {appName} application. Full functionality will be implemented in a future phase.
      </p>
    </motion.div>
  );
}