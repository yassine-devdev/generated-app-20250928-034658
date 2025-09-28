import React, { useState } from 'react';
import { AppContainer } from './AppContainer';
import { appsNavigationData } from '@/lib/appsNavigation';
import { CodeEditor } from './coder/CodeEditor';
import { ApiDocs } from './coder/ApiDocs';
import { useStudioStore } from '@/store/studioStore';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable';
import { CoderAIChat } from './coder/CoderAIChat';
export function CoderApp() {
  const navData = appsNavigationData.Coder;
  const [code, setCode] = useState(`// Welcome to the Aetheris Coder!
// Use the 'studio' object to interact with the Studio canvas.
studio.log('Creating a new element...');
studio.addElement('rectangle');
`);
  const [output, setOutput] = useState<string[]>(['// Console output will appear here']);
  const handleRunScript = (currentCode: string) => {
    const { addElement, updateElementProps, getElementById, deleteSelectedElement, selectElement } = useStudioStore.getState();
    const logs: string[] = [];
    const customLog = (...args: any[]) => {
      const formattedArgs = args.map(arg => {
        try {
          if (typeof arg === 'object' && arg !== null) {
            return JSON.stringify(arg, null, 2);
          }
          return String(arg);
        } catch (e) {
          return '[Unserializable Object]';
        }
      }).join(' ');
      logs.push(`> ${formattedArgs}`);
    };
    const studioAPI = { addElement, updateElementProps, getElementById, deleteSelectedElement, selectElement, log: customLog };
    try {
      const scriptFunction = new Function('studio', currentCode);
      scriptFunction(studioAPI);
      setOutput(logs.length > 0 ? logs : ['// Script executed successfully with no output.']);
    } catch (error) {
      setOutput([`// Error: ${error instanceof Error ? error.message : 'An unknown error occurred.'}`]);
    }
  };
  const handleInsertCode = (newCode: string) => {
    setCode(prev => `${prev}\n${newCode}`);
  };
  const renderContent = (activeSubnav: string) => {
    if (activeSubnav === 'api-docs') {
      return <ApiDocs />;
    }
    return (
      <ResizablePanelGroup direction="vertical">
        <ResizablePanel defaultSize={65}>
          <ResizablePanelGroup direction="horizontal">
            <ResizablePanel defaultSize={60}>
              <CodeEditor
                code={code}
                setCode={setCode}
                onRun={handleRunScript}
                onInsertCode={handleInsertCode}
              />
            </ResizablePanel>
            <ResizableHandle withHandle />
            <ResizablePanel defaultSize={40}>
              <CoderAIChat
                codeContext={code}
                onInsertCode={handleInsertCode}
              />
            </ResizablePanel>
          </ResizablePanelGroup>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={35}>
          <div className="h-full flex flex-col p-2">
            <h3 className="font-semibold text-lg mb-2 px-2">Console</h3>
            <div className="flex-1 bg-zinc-950/50 rounded-md p-2 border border-white/20 overflow-y-auto">
              <pre className="text-xs text-muted-foreground whitespace-pre-wrap">
                {output.join('\n')}
              </pre>
            </div>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    );
  };
  return (
    <AppContainer navData={navData}>
      {(activeSubnav) => renderContent(activeSubnav)}
    </AppContainer>
  );
}