import React from 'react';
import { ToolKey } from './StudioToolPanel';
import { useStudioStore } from '@/store/studioStore';
import { Button } from '@/components/ui/button';
import { Square, Type } from 'lucide-react';
interface ElementOptionsPanelProps {
  activeTool: ToolKey;
}
export function ElementOptionsPanel({ activeTool }: ElementOptionsPanelProps) {
  const addElement = useStudioStore((state) => state.addElement);
  const renderContent = () => {
    switch (activeTool) {
      case 'elements':
        return (
          <div className="space-y-4">
            <h3 className="font-semibold">Shapes</h3>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => addElement('rectangle')}
                className="flex items-center justify-center h-20 bg-zinc-800 rounded-md hover:bg-zinc-700 transition-colors"
              >
                <Square className="w-8 h-8 text-muted-foreground" />
              </button>
            </div>
          </div>
        );
      case 'text':
        return (
          <div className="space-y-4">
            <h3 className="font-semibold">Text</h3>
            <Button onClick={() => addElement('text')} className="w-full">
              <Type className="mr-2 h-4 w-4" /> Add Text Box
            </Button>
          </div>
        );
      case 'uploads':
        return <p className="text-muted-foreground text-sm">Uploads coming soon.</p>;
      case 'components':
        return <p className="text-muted-foreground text-sm">Components coming soon.</p>;
      default:
        return null;
    }
  };
  return <div>{renderContent()}</div>;
}