import React from 'react';
import { cn } from '@/lib/utils';
type Status = 'Operational' | 'Degraded' | 'Offline';
interface StatusIndicatorProps {
  status: Status;
}
const statusConfig: Record<Status, { color: string; text: string }> = {
  Operational: { color: 'bg-green-500', text: 'text-green-400' },
  Degraded: { color: 'bg-yellow-500', text: 'text-yellow-400' },
  Offline: { color: 'bg-red-500', text: 'text-red-400' },
};
export function StatusIndicator({ status }: StatusIndicatorProps) {
  const config = statusConfig[status];
  return (
    <div className="flex items-center space-x-2">
      <span className={cn('h-2 w-2 rounded-full animate-pulse', config.color)} />
      <span className={cn('text-sm font-medium', config.text)}>{status}</span>
    </div>
  );
}