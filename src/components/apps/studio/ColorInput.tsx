import React from 'react';
import { Input } from '@/components/ui/input';
interface ColorInputProps {
  value: string;
  onChange: (value: string) => void;
}
export function ColorInput({ value, onChange }: ColorInputProps) {
  return (
    <div className="flex items-center gap-2">
      <div className="relative h-8 w-8 flex-shrink-0">
        <Input
          type="color"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="absolute inset-0 h-full w-full cursor-pointer p-0 opacity-0"
        />
        <div
          className="h-full w-full rounded-md border border-white/20"
          style={{ backgroundColor: value }}
        />
      </div>
      <Input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-8 bg-zinc-800"
      />
    </div>
  );
}