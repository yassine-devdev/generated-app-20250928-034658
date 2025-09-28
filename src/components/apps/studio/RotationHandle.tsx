import React from 'react';
import { RotateCw } from 'lucide-react';
import { cn } from '@/lib/utils';
interface RotationHandleProps {
  onMouseDown: (e: React.MouseEvent<HTMLDivElement>) => void;
}
export function RotationHandle({ onMouseDown }: RotationHandleProps) {
  return (
    <div
      onMouseDown={onMouseDown}
      className={cn(
        'absolute left-1/2 -translate-x-1/2 top-[-32px] h-6 w-6 rounded-full bg-primary border-2 border-background flex items-center justify-center cursor-alias'
      )}
    >
      <RotateCw className="w-3 h-3 text-primary-foreground" />
    </div>
  );
}