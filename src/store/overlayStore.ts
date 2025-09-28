import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import {
  Palette, Clapperboard, Gamepad2, Coffee, Store, Shirt,
  Heart, BookOpen, Dumbbell, Church, Calendar, LucideIcon, Code
} from 'lucide-react';
export type AppName =
  | 'Studio' | 'Media' | 'Gamification' | 'Leisure' | 'Market'
  | 'Lifestyle' | 'Hobbies' | 'Knowledge' | 'Sports' | 'Religion' | 'Events'
  | 'Coder';
export const appDetails: Record<AppName, { icon: LucideIcon }> = {
  Studio: { icon: Palette }, Media: { icon: Clapperboard }, Gamification: { icon: Gamepad2 },
  Leisure: { icon: Coffee }, Market: { icon: Store }, Lifestyle: { icon: Shirt },
  Hobbies: { icon: Heart }, Knowledge: { icon: BookOpen }, Sports: { icon: Dumbbell },
  Religion: { icon: Church }, Events: { icon: Calendar }, Coder: { icon: Code },
};
export type AppState = 'open' | 'minimized' | 'maximized';
export interface AppInstance {
  id: string;
  appName: AppName;
  state: AppState;
  position: { x: number; y: number };
  size: { width: number; height: number };
  zIndex: number;
  lastPosition?: { x: number; y: number };
  lastSize?: { width: number; height: number };
}
type OverlayState = {
  apps: AppInstance[];
  nextZIndex: number;
};
type OverlayActions = {
  openApp: (appName: AppName) => void;
  closeApp: (id: string) => void;
  focusApp: (id: string) => void;
  minimizeApp: (id: string) => void;
  toggleMaximize: (id: string) => void;
  updatePosition: (id: string, position: { x: number; y: number }) => void;
};
const INITIAL_Z_INDEX = 10;
export const useOverlayStore = create<OverlayState & OverlayActions>()(
  immer((set, get) => ({
    apps: [],
    nextZIndex: INITIAL_Z_INDEX,
    openApp: (appName) => {
      const { apps, nextZIndex } = get();
      const existingInstance = apps.find(app => app.appName === appName);
      if (existingInstance) {
        set(state => {
          const app = state.apps.find(a => a.id === existingInstance.id);
          if (app) {
            if (app.state === 'minimized') {
              app.state = 'open';
            }
            app.zIndex = state.nextZIndex;
            state.nextZIndex += 1;
          }
        });
      } else {
        const newApp: AppInstance = {
          id: `${appName}-${Date.now()}`,
          appName,
          state: 'open',
          position: { x: 100 + apps.length * 30, y: 100 + apps.length * 30 },
          size: { width: 800, height: 500 },
          zIndex: nextZIndex,
        };
        set(state => {
          state.apps.push(newApp);
          state.nextZIndex += 1;
        });
      }
    },
    closeApp: (id) => {
      set(state => {
        state.apps = state.apps.filter(app => app.id !== id);
      });
    },
    focusApp: (id) => {
      set(state => {
        const app = state.apps.find(a => a.id === id);
        if (app && app.zIndex < state.nextZIndex - 1) {
          app.zIndex = state.nextZIndex;
          state.nextZIndex += 1;
        }
        if (app && app.state === 'minimized') {
          app.state = 'open';
        }
      });
    },
    minimizeApp: (id) => {
      set(state => {
        const app = state.apps.find(a => a.id === id);
        if (app) {
          app.state = 'minimized';
        }
      });
    },
    toggleMaximize: (id) => {
      set(state => {
        const app = state.apps.find(a => a.id === id);
        if (app) {
          if (app.state === 'maximized') {
            app.state = 'open';
            app.position = app.lastPosition || { x: 150, y: 150 };
            app.size = app.lastSize || { width: 800, height: 500 };
          } else {
            app.lastPosition = app.position;
            app.lastSize = app.size;
            app.state = 'maximized';
          }
        }
      });
    },
    updatePosition: (id, position) => {
      set(state => {
        const app = state.apps.find(a => a.id === id);
        if (app) {
          app.position = position;
        }
      });
    },
  }))
);