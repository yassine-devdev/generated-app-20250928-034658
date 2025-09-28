import React from 'react';
import { cn } from '@/lib/utils';
interface ResizeHandleProps {
  position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  onMouseDown: (e: React.MouseEvent<HTMLDivElement>) => void;
}
export function ResizeHandle({ position, onMouseDown }: ResizeHandleProps) {
  const positionClasses = {
    'top-left': 'top-[-4px] left-[-4px] cursor-nwse-resize',
    'top-right': 'top-[-4px] right-[-4px] cursor-nesw-resize',
    'bottom-left': 'bottom-[-4px] left-[-4px] cursor-nesw-resize',
    'bottom-right': 'bottom-[-4px] right-[-4px] cursor-nwse-resize',
  };
  return (
    <div
      onMouseDown={onMouseDown}
      className={cn(
        'absolute h-3 w-3 rounded-full bg-primary border-2 border-background',
        positionClasses[position]
      )}
    />
  );
}