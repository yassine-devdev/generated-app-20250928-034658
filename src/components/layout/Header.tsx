import React from 'react';
import { useDashboardStore } from '@/store/dashboardStore';
import { useAuthStore } from '@/store/authStore';
import { navigationData } from '@/lib/navigation';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';
import { useShallow } from 'zustand/react/shallow';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { LogOut } from 'lucide-react';
export function Header() {
  const { currentRole, activeRightSidebarItem, activeHeaderItem, setActiveHeaderItem } = useDashboardStore(
    useShallow((state) => ({
      currentRole: state.currentRole,
      activeRightSidebarItem: state.activeRightSidebarItem,
      activeHeaderItem: state.activeHeaderItem,
      setActiveHeaderItem: state.setActiveHeaderItem,
    }))
  );
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  if (!currentRole) return null;
  const rightSidebarItem = navigationData[currentRole]?.find(item => item.key === activeRightSidebarItem);
  const headerItems = rightSidebarItem?.header || [];
  const handleItemClick = (itemKey: string) => {
    setActiveHeaderItem(itemKey);
    const headerItem = headerItems.find(item => item.key === itemKey);
    const firstSubnavItem = headerItem?.subnav?.[0];
    if (firstSubnavItem?.path) {
      navigate(firstSubnavItem.path);
    }
  };
  const handleLogout = () => {
    logout();
    navigate('/');
  };
  return (
    <header className="h-16 min-h-16 flex items-center justify-between px-4 sm:px-6 lg:px-8 glass-pane rounded-none border-t-0 border-l-0 border-r-0">
      <nav className="flex items-center space-x-2 overflow-x-auto">
        {headerItems.map((item) => (
          <Button
            key={item.key}
            variant="ghost"
            onClick={() => handleItemClick(item.key)}
            className={cn(
              'transition-colors duration-200',
              activeHeaderItem === item.key
                ? 'text-primary bg-primary/10'
                : 'text-muted-foreground hover:text-foreground'
            )}
          >
            {item.name}
          </Button>
        ))}
      </nav>
      <div className="flex items-center gap-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-10 w-10 rounded-full">
              <Avatar className="h-9 w-9">
                <AvatarImage src={user?.avatarUrl ?? ''} alt={`${user?.firstName} ${user?.lastName}`} />
                <AvatarFallback>
                  {user?.firstName?.[0] ?? ''}{user?.lastName?.[0] ?? ''}
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">{user?.firstName} {user?.lastName}</p>
                <p className="text-xs leading-none text-muted-foreground">{user?.email}</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}