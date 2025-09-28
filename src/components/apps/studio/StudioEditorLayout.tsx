import React from 'react';
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { StudioToolPanel } from './StudioToolPanel';
import { StudioCanvas } from './StudioCanvas';
import { StudioPropertyInspector } from './StudioPropertyInspector';
export function StudioEditorLayout() {
  return (
    <ResizablePanelGroup direction="horizontal" className="h-full w-full">
      <ResizablePanel defaultSize={20} minSize={15} maxSize={30}>
        <StudioToolPanel />
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={60}>
        <StudioCanvas />
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={20} minSize={15} maxSize={30}>
        <StudioPropertyInspector />
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}