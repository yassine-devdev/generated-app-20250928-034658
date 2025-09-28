import React, { useState } from 'react';
import { AppHeaderItem } from '@/lib/appsNavigation';
import { cn } from '@/lib/utils';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
interface AppContainerProps {
  navData: AppHeaderItem[];
  children: (activeSubnav: string) => React.ReactNode;
}
export function AppContainer({ navData, children }: AppContainerProps) {
  const [activeHeader, setActiveHeader] = useState(navData[0]?.key || '');
  const [activeSubnav, setActiveSubnav] = useState(navData[0]?.subnav[0]?.key || '');
  const headerItem = navData.find(h => h.key === activeHeader);
  const subnavItems = headerItem?.subnav || [];
  const handleHeaderClick = (headerKey: string) => {
    setActiveHeader(headerKey);
    const newHeader = navData.find(h => h.key === headerKey);
    setActiveSubnav(newHeader?.subnav[0]?.key || '');
  };
  return (
    <div className="flex h-full w-full">
      {/* SubnavLeft */}
      <aside className="w-16 min-w-16 h-full flex flex-col items-center py-2 bg-zinc-950/30">
        <div className="flex flex-col items-center space-y-2">
          {subnavItems.map((item) => (
            <TooltipProvider key={item.key} delayDuration={0}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    onClick={() => setActiveSubnav(item.key)}
                    className={cn(
                      'flex flex-col items-center justify-center w-14 h-14 rounded-lg transition-all duration-200',
                      activeSubnav === item.key
                        ? 'bg-primary/20 text-primary'
                        : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground'
                    )}
                  >
                    <item.icon className="w-5 h-5" />
                    <span className="text-2xs mt-1 font-medium">{item.name}</span>
                  </button>
                </TooltipTrigger>
                <TooltipContent side="right"><p>{item.name}</p></TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ))}
        </div>
      </aside>
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* L1 Header */}
        <header className="h-12 min-h-12 flex items-center px-4 bg-zinc-950/30 border-b border-white/10">
          <nav className="flex items-center space-x-2">
            {navData.map((item) => (
              <button
                key={item.key}
                onClick={() => handleHeaderClick(item.key)}
                className={cn(
                  'px-3 py-1 rounded-md text-sm font-medium transition-colors',
                  activeHeader === item.key
                    ? 'bg-primary/10 text-primary'
                    : 'text-muted-foreground hover:text-foreground'
                )}
              >
                {item.name}
              </button>
            ))}
          </nav>
        </header>
        {/* Content Area */}
        <main className="flex-1 overflow-y-auto p-4">
          {children(activeSubnav)}
        </main>
      </div>
    </div>
  );
}