import React from 'react';
import { LucideIcon } from 'lucide-react';
import { motion } from 'framer-motion';
interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
}
export function EmptyState({ icon: Icon, title, description }: EmptyStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center text-center p-12 rounded-lg bg-zinc-900/20 border border-dashed border-white/10"
    >
      <Icon className="w-12 h-12 text-muted-foreground mb-4" />
      <h3 className="text-xl font-semibold text-foreground">{title}</h3>
      <p className="mt-1 text-sm text-muted-foreground max-w-xs">{description}</p>
    </motion.div>
  );
}