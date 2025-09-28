import {
  Paintbrush,
  Shapes,
  Type,
  Palette,
  Layers,
  Component,
  LucideIcon,
  Film,
  Music,
  Image as ImageIcon,
  Gamepad2,
  Trophy,
  Users,
  LayoutTemplate,
  Code,
  BookText,
} from 'lucide-react';
import { AppName } from '@/store/overlayStore';
export interface AppSubnavItem {
  key: string;
  name: string;
  icon: LucideIcon;
}
export interface AppHeaderItem {
  key: string;
  name:string;
  subnav: AppSubnavItem[];
}
export const appsNavigationData: Record<AppName, AppHeaderItem[]> = {
  Studio: [
    {
      key: 'design',
      name: 'Design',
      subnav: [
        { key: 'canvas', name: 'Canvas', icon: LayoutTemplate },
        { key: 'templates', name: 'Templates', icon: Layers },
        { key: 'branding', name: 'Branding', icon: Palette },
      ],
    },
    {
      key: 'elements',
      name: 'Elements',
      subnav: [
        { key: 'shapes', name: 'Shapes', icon: Shapes },
        { key: 'text', name: 'Text', icon: Type },
        { key: 'assets', name: 'Assets', icon: Component },
      ],
    },
  ],
  Media: [
    {
      key: 'library',
      name: 'Library',
      subnav: [
        { key: 'videos', name: 'Videos', icon: Film },
        { key: 'music', name: 'Music', icon: Music },
        { key: 'images', name: 'Images', icon: ImageIcon },
      ],
    },
  ],
  Gamification: [
    {
      key: 'main',
      name: 'Main',
      subnav: [
        { key: 'leaderboard', name: 'Leaderboard', icon: Trophy },
        { key: 'achievements', name: 'Achievements', icon: Gamepad2 },
        { key: 'players', name: 'Players', icon: Users },
      ],
    },
  ],
  Coder: [
    {
      key: 'main',
      name: 'Main',
      subnav: [
        { key: 'editor', name: 'Editor', icon: Code },
        { key: 'api-docs', name: 'API Docs', icon: BookText },
      ],
    },
  ],
  Leisure: [],
  Market: [],
  Lifestyle: [],
  Hobbies: [],
  Knowledge: [],
  Sports: [],
  Religion: [],
  Events: [],
};