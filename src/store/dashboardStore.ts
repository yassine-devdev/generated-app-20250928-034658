import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { navigationData, Role } from '@/lib/navigation';
type DashboardState = {
  currentRole: Role | null;
  activeRightSidebarItem: string;
  activeHeaderItem: string;
  activeSubnavItem: string;
};
type DashboardActions = {
  setRole: (role: Role) => void;
  setActiveRightSidebarItem: (itemKey: string) => void;
  setActiveHeaderItem: (itemKey: string) => void;
  setActiveSubnavItem: (itemKey: string) => void;
  setNavigationFromPath: (path: string) => void;
};
export const useDashboardStore = create<DashboardState & DashboardActions>()(
  immer((set, get) => ({
    currentRole: null,
    activeRightSidebarItem: '',
    activeHeaderItem: '',
    activeSubnavItem: '',
    setRole: (role) => {
      set((state) => {
        state.currentRole = role;
        const firstRightSidebarItem = navigationData[role]?.[0];
        if (firstRightSidebarItem) {
          state.activeRightSidebarItem = firstRightSidebarItem.key;
          const firstHeaderItem = firstRightSidebarItem.header?.[0];
          if (firstHeaderItem) {
            state.activeHeaderItem = firstHeaderItem.key;
            const firstSubnavItem = firstHeaderItem.subnav?.[0];
            if (firstSubnavItem) {
              state.activeSubnavItem = firstSubnavItem.key;
            }
          }
        }
      });
    },
    setActiveRightSidebarItem: (itemKey) => {
      const role = get().currentRole;
      if (!role) return;
      const rightSidebarItem = navigationData[role]?.find(item => item.key === itemKey);
      if (rightSidebarItem) {
        set(state => {
          state.activeRightSidebarItem = itemKey;
          const firstHeaderItem = rightSidebarItem.header?.[0];
          if (firstHeaderItem) {
            state.activeHeaderItem = firstHeaderItem.key;
            const firstSubnavItem = firstHeaderItem.subnav?.[0];
            if (firstSubnavItem) {
              state.activeSubnavItem = firstSubnavItem.key;
            } else {
              state.activeSubnavItem = '';
            }
          } else {
            state.activeHeaderItem = '';
            state.activeSubnavItem = '';
          }
        });
      }
    },
    setActiveHeaderItem: (itemKey) => {
      const role = get().currentRole;
      if (!role) return;
      const rightSidebarItem = navigationData[role]?.find(item => item.key === get().activeRightSidebarItem);
      const headerItem = rightSidebarItem?.header.find(item => item.key === itemKey);
      if (headerItem) {
        set(state => {
          state.activeHeaderItem = itemKey;
          const firstSubnavItem = headerItem.subnav?.[0];
          if (firstSubnavItem) {
            state.activeSubnavItem = firstSubnavItem.key;
          } else {
            state.activeSubnavItem = '';
          }
        });
      }
    },
    setActiveSubnavItem: (itemKey) => {
      set({ activeSubnavItem: itemKey });
    },
    setNavigationFromPath: (path) => {
      const role = get().currentRole;
      if (!role) return;
      const roleNav = navigationData[role];
      if (!roleNav) return;
      for (const rightItem of roleNav) {
        for (const headerItem of rightItem.header) {
          for (const subnavItem of headerItem.subnav) {
            if (subnavItem.path === path) {
              set(state => {
                state.activeRightSidebarItem = rightItem.key;
                state.activeHeaderItem = headerItem.key;
                state.activeSubnavItem = subnavItem.key;
              });
              return; // Exit once the correct path is found
            }
          }
        }
      }
    },
  }))
);