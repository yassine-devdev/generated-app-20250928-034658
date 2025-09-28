import React, { useState } from 'react';
import { Shapes, Type, Upload, Component } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ElementOptionsPanel } from './ElementOptionsPanel';
const tools = [
  { key: 'elements', name: 'Elements', icon: Shapes },
  { key: 'text', name: 'Text', icon: Type },
  { key: 'uploads', name: 'Uploads', icon: Upload },
  { key: 'components', name: 'Components', icon: Component },
];
export type ToolKey = 'elements' | 'text' | 'uploads' | 'components';
export function StudioToolPanel() {
  const [activeTool, setActiveTool] = useState<ToolKey>('elements');
  return (
    <div className="h-full flex bg-zinc-900">
      <div className="w-20 min-w-20 flex flex-col items-center py-4 space-y-2 border-r border-white/10">
        {tools.map((tool) => (
          <button
            key={tool.key}
            onClick={() => setActiveTool(tool.key as ToolKey)}
            className={cn(
              'flex flex-col items-center justify-center w-16 h-16 rounded-lg transition-colors',
              activeTool === tool.key
                ? 'bg-primary/20 text-primary'
                : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground'
            )}
          >
            <tool.icon className="w-6 h-6" />
            <span className="text-xs mt-1">{tool.name}</span>
          </button>
        ))}
      </div>
      <div className="flex-1 p-4 overflow-y-auto">
        <ElementOptionsPanel activeTool={activeTool} />
      </div>
    </div>
  );
}