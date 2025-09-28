import React from 'react';
import { motion } from 'framer-motion';
import { AIChat } from '@/components/AIChat';
export function ConciergeChatPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="h-full flex flex-col"
    >
      <div className="mb-4">
        <h1 className="text-3xl font-display font-bold">Concierge Chat</h1>
        <p className="text-muted-foreground">Your personal AI assistant for any task.</p>
      </div>
      <div className="flex-1 min-h-0">
        <AIChat />
      </div>
    </motion.div>
  );
}