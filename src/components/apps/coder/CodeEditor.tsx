import React from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Play, Trash2, Sparkles, Code, Wand2 } from 'lucide-react';
import { CoderAIChat } from './CoderAIChat';
interface CodeEditorProps {
  code: string;
  setCode: (code: string) => void;
  onRun: (code: string) => void;
  onInsertCode: (code: string) => void;
}
export function CodeEditor({ code, setCode, onRun, onInsertCode }: CodeEditorProps) {
  return (
    <div className="h-full flex flex-col p-2">
      <div className="flex justify-between items-center mb-2 px-2">
        <h3 className="font-semibold text-lg">Code Editor</h3>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => setCode('')}>
            <Trash2 className="w-4 h-4 mr-2" /> Clear
          </Button>
          <Button size="sm" onClick={() => onRun(code)}>
            <Play className="w-4 h-4 mr-2" /> Run Script
          </Button>
        </div>
      </div>
      <Textarea
        value={code}
        onChange={(e) => setCode(e.target.value)}
        placeholder="Write your script here..."
        className="flex-1 resize-none font-mono bg-zinc-950/50 border-white/20 focus-visible:ring-primary text-sm"
      />
    </div>
  );
}