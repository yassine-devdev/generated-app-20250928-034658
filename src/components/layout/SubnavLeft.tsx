import React from 'react';
import { useDashboardStore } from '@/store/dashboardStore';
import { navigationData } from '@/lib/navigation';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';
import { useShallow } from 'zustand/react/shallow';
export function SubnavLeft() {
  const { currentRole, activeRightSidebarItem, activeHeaderItem, activeSubnavItem, setActiveSubnavItem } = useDashboardStore(
    useShallow((state) => ({
      currentRole: state.currentRole,
      activeRightSidebarItem: state.activeRightSidebarItem,
      activeHeaderItem: state.activeHeaderItem,
      activeSubnavItem: state.activeSubnavItem,
      setActiveSubnavItem: state.setActiveSubnavItem,
    }))
  );
  const navigate = useNavigate();
  if (!currentRole) return null;
  const rightSidebarItem = navigationData[currentRole]?.find(item => item.key === activeRightSidebarItem);
  const headerItem = rightSidebarItem?.header.find(item => item.key === activeHeaderItem);
  const subnavItems = headerItem?.subnav || [];
  const handleItemClick = (itemKey: string, path: string) => {
    setActiveSubnavItem(itemKey);
    navigate(path);
  };
  return (
    <aside className="w-16 min-w-16 h-full flex flex-col items-center py-4 glass-pane rounded-none border-r-0 border-t-0 border-b-0">
      <div className="flex flex-col items-center space-y-2">
        {subnavItems.map((item) => (
          <TooltipProvider key={item.key} delayDuration={0}>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={() => handleItemClick(item.key, item.path)}
                  className={cn(
                    'flex flex-col items-center justify-center w-14 h-14 rounded-lg transition-all duration-200 ease-in-out transform hover:scale-105',
                    activeSubnavItem === item.key
                      ? 'bg-primary/20 text-primary'
                      : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground'
                  )}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="text-2xs mt-1 font-medium">{item.name}</span>
                </button>
              </TooltipTrigger>
              <TooltipContent side="right">
                <p>{item.name}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ))}
      </div>
    </aside>
  );
}