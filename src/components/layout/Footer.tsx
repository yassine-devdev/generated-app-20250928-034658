import React from 'react';
import { useOverlayStore, appDetails, AppName } from '@/store/overlayStore';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { useShallow } from 'zustand/react/shallow';
export function Footer() {
  const { apps, openApp, focusApp } = useOverlayStore(
    useShallow(state => ({
      apps: state.apps,
      openApp: state.openApp,
      focusApp: state.focusApp,
    }))
  );
  const appLaunchers = Object.keys(appDetails) as AppName[];
  const minimizedApps = apps.filter(app => app.state === 'minimized');
  const openApps = apps.filter(app => app.state !== 'minimized');
  const isAppOpen = (appName: AppName) => openApps.some(app => app.appName === appName);
  return (
    <footer className="h-16 min-h-16 flex items-center justify-between px-4 sm:px-6 lg:px-8 glass-pane rounded-none border-b-0 border-l-0 border-r-0">
      <div className="flex items-center space-x-2 overflow-x-auto">
        {appLaunchers.map((appName) => {
          const { icon: Icon } = appDetails[appName];
          const isOpen = isAppOpen(appName);
          return (
            <TooltipProvider key={appName} delayDuration={0}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    onClick={() => openApp(appName)}
                    className={cn(
                      'relative flex items-center justify-center w-12 h-12 rounded-lg transition-all duration-200 ease-in-out transform hover:scale-110 hover:bg-primary/20',
                      'text-muted-foreground hover:text-foreground'
                    )}
                  >
                    <Icon className="w-6 h-6" />
                    {isOpen && <span className="absolute bottom-1 h-1 w-1 rounded-full bg-primary" />}
                  </button>
                </TooltipTrigger>
                <TooltipContent side="top"><p>{appName}</p></TooltipContent>
              </Tooltip>
            </TooltipProvider>
          );
        })}
      </div>
      {minimizedApps.length > 0 && (
        <div className="flex items-center gap-2">
          <Separator orientation="vertical" className="h-8" />
          {minimizedApps.map((app) => {
            const { icon: Icon } = appDetails[app.appName];
            return (
              <TooltipProvider key={app.id} delayDuration={0}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button
                      onClick={() => focusApp(app.id)}
                      className="flex items-center justify-center w-12 h-12 rounded-lg transition-all duration-200 ease-in-out transform hover:scale-110 bg-muted/50 text-foreground"
                    >
                      <Icon className="w-6 h-6" />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent side="top"><p>Restore {app.appName}</p></TooltipContent>
                </Tooltip>
              </TooltipProvider>
            );
          })}
        </div>
      )}
    </footer>
  );
}