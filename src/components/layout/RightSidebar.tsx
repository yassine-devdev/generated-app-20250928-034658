import React from 'react';
import { useDashboardStore } from '@/store/dashboardStore';
import { navigationData } from '@/lib/navigation';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';
import { useShallow } from 'zustand/react/shallow';
export function RightSidebar() {
  const { currentRole, activeRightSidebarItem, setActiveRightSidebarItem } = useDashboardStore(
    useShallow((state) => ({
      currentRole: state.currentRole,
      activeRightSidebarItem: state.activeRightSidebarItem,
      setActiveRightSidebarItem: state.setActiveRightSidebarItem,
    }))
  );
  const navigate = useNavigate();
  if (!currentRole) return null;
  const sidebarItems = navigationData[currentRole];
  const handleItemClick = (itemKey: string) => {
    setActiveRightSidebarItem(itemKey);
    const rightSidebarItem = sidebarItems.find(item => item.key === itemKey);
    const firstHeaderItem = rightSidebarItem?.header?.[0];
    const firstSubnavItem = firstHeaderItem?.subnav?.[0];
    if (firstSubnavItem?.path) {
      navigate(firstSubnavItem.path);
    }
  };
  return (
    <aside className="w-74 min-w-74 h-full flex flex-col items-center py-4 glass-pane rounded-none border-l-0 border-t-0 border-b-0">
      <div className="flex flex-col items-center space-y-4">
        {sidebarItems.map((item) => (
          <TooltipProvider key={item.key} delayDuration={0}>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={() => handleItemClick(item.key)}
                  className={cn(
                    'flex flex-col items-center justify-center w-16 h-16 rounded-lg transition-all duration-200 ease-in-out transform hover:scale-105',
                    activeRightSidebarItem === item.key
                      ? 'bg-primary/20 text-primary'
                      : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground'
                  )}
                >
                  <item.icon className="w-6 h-6" />
                  <span className="text-xs mt-1 font-medium">{item.name}</span>
                </button>
              </TooltipTrigger>
              <TooltipContent side="left">
                <p>{item.name}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ))}
      </div>
    </aside>
  );
}