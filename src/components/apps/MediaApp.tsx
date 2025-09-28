import React from 'react';
import { AppContainer } from './AppContainer';
import { appsNavigationData } from '@/lib/appsNavigation';
import { motion } from 'framer-motion';
import { Folder, Image as ImageIcon, Music, Film, Search, Upload } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
const mockFolders = [
  { name: 'Logos', icon: ImageIcon },
  { name: 'Campaigns', icon: Folder },
  { name: 'Stock Audio', icon: Music },
  { name: 'B-Roll', icon: Film },
];
const mockAssets = [
  { id: 1, type: 'image', name: 'logo-dark.png', url: 'https://via.placeholder.com/150/09090B/FFFFFF?text=Logo' },
  { id: 2, type: 'image', name: 'hero-bg.jpg', url: 'https://via.placeholder.com/150/4338CA/FFFFFF?text=Hero' },
  { id: 3, type: 'video', name: 'promo-final.mp4', url: 'https://via.placeholder.com/150/14B8A6/FFFFFF?text=Video' },
  { id: 4, type: 'image', name: 'social-post-1.png', url: 'https://via.placeholder.com/150/F1F5F9/09090B?text=Post' },
  { id: 5, type: 'audio', name: 'background-music.mp3', url: 'https://via.placeholder.com/150/F59E0B/FFFFFF?text=Audio' },
  { id: 6, type: 'image', name: 'icon-set.svg', url: 'https://via.placeholder.com/150/6D28D9/FFFFFF?text=Icon' },
];
const AssetCard = ({ asset }: { asset: typeof mockAssets[0] }) => {
  let Icon = ImageIcon;
  if (asset.type === 'video') Icon = Film;
  if (asset.type === 'audio') Icon = Music;
  return (
    <Card className="overflow-hidden group transition-all hover:shadow-lg hover:-translate-y-1">
      <CardContent className="p-0">
        <div className="aspect-square bg-muted flex items-center justify-center relative">
          <img src={asset.url} alt={asset.name} className="object-cover w-full h-full" />
          <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <Icon className="w-8 h-8 text-white" />
          </div>
        </div>
        <div className="p-2 text-center">
          <p className="text-xs font-medium truncate">{asset.name}</p>
        </div>
      </CardContent>
    </Card>
  );
};
const MediaBrowser = () => (
  <div className="flex h-full w-full bg-zinc-800/50 rounded-lg border border-dashed border-white/10">
    {/* Sidebar */}
    <div className="w-56 min-w-56 border-r border-white/10 p-4">
      <h3 className="font-semibold mb-4">Folders</h3>
      <ul className="space-y-2">
        {mockFolders.map((folder, index) => (
          <li key={index}>
            <button className={cn(
              "w-full flex items-center gap-2 p-2 rounded-md text-sm text-left transition-colors",
              index === 0 ? "bg-primary/10 text-primary" : "hover:bg-muted/50"
            )}>
              <folder.icon className="w-4 h-4" />
              {folder.name}
            </button>
          </li>
        ))}
      </ul>
    </div>
    {/* Main Content */}
    <div className="flex-1 flex flex-col">
      <div className="p-4 border-b border-white/10 flex items-center justify-between">
        <div className="relative w-full max-w-xs">
          <Search className="absolute left-2 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder="Search assets..." className="pl-8 bg-zinc-900" />
        </div>
        <Button><Upload className="w-4 h-4 mr-2" /> Upload</Button>
      </div>
      <div className="flex-1 p-4 overflow-y-auto">
        <motion.div
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.05 },
            },
          }}
          initial="hidden"
          animate="visible"
        >
          {mockAssets.map(asset => (
            <motion.div key={asset.id} variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
              <AssetCard asset={asset} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  </div>
);
export function MediaApp() {
  const navData = appsNavigationData.Media;
  return (
    <AppContainer navData={navData}>
      {(activeSubnav) => <MediaBrowser />}
    </AppContainer>
  );
}