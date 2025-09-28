import React from 'react';
import { motion, PanInfo } from 'framer-motion';
import { useOverlayStore, AppInstance, appDetails } from '@/store/overlayStore';
import { X, Minus, Square, Copy } from 'lucide-react';
import { StudioApp } from '../apps/StudioApp';
import { GenericApp } from '../apps/GenericApp';
import { MediaApp } from '../apps/MediaApp';
import { GamificationApp } from '../apps/GamificationApp';
import { LeisureApp } from '../apps/LeisureApp';
import { MarketApp } from '../apps/MarketApp';
import { LifestyleApp } from '../apps/LifestyleApp';
import { HobbiesApp } from '../apps/HobbiesApp';
import { KnowledgeApp } from '../apps/KnowledgeApp';
import { SportsApp } from '../apps/SportsApp';
import { ReligionApp } from '../apps/ReligionApp';
import { EventsApp } from '../apps/EventsApp';
import { CoderApp } from '../apps/CoderApp';
import { cn } from '@/lib/utils';
interface AppWindowProps {
  app: AppInstance;
}
const windowVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.9 },
};
export function AppWindow({ app }: AppWindowProps) {
  const { focusApp, closeApp, minimizeApp, toggleMaximize, updatePosition } = useOverlayStore();
  const { icon: Icon } = appDetails[app.appName];
  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    updatePosition(app.id, { x: app.position.x + info.offset.x, y: app.position.y + info.offset.y });
  };
  const renderAppContent = () => {
    switch (app.appName) {
      case 'Studio': return <StudioApp />;
      case 'Media': return <MediaApp />;
      case 'Gamification': return <GamificationApp />;
      case 'Leisure': return <LeisureApp />;
      case 'Market': return <MarketApp />;
      case 'Lifestyle': return <LifestyleApp />;
      case 'Hobbies': return <HobbiesApp />;
      case 'Knowledge': return <KnowledgeApp />;
      case 'Sports': return <SportsApp />;
      case 'Religion': return <ReligionApp />;
      case 'Events': return <EventsApp />;
      case 'Coder': return <CoderApp />;
      default: return <GenericApp appName={app.appName} />;
    }
  };
  const isMaximized = app.state === 'maximized';
  return (
    <motion.div
      key={app.id}
      variants={windowVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      transition={{ duration: 0.2, ease: 'easeInOut' }}
      drag={!isMaximized}
      dragListener={false}
      dragMomentum={false}
      onDragEnd={handleDragEnd}
      onMouseDown={() => focusApp(app.id)}
      onTouchStart={() => focusApp(app.id)}
      className={cn(
        "absolute rounded-lg shadow-2xl glass-pane pointer-events-auto flex flex-col overflow-hidden",
        isMaximized ? "inset-0 !transform-none rounded-none" : ""
      )}
      style={isMaximized ? { zIndex: app.zIndex } : {
        x: app.position.x,
        y: app.position.y,
        width: app.size.width,
        height: app.size.height,
        zIndex: app.zIndex,
      }}
    >
      <motion.div
        onPointerDown={(e) => {
          if (!isMaximized) {
            (e.target as HTMLElement).closest('.app-window-drag-handle')?.setPointerCapture(e.pointerId);
          }
        }}
        className="app-window-drag-handle h-10 bg-zinc-950/50 flex items-center justify-between px-3 flex-shrink-0 cursor-grab active:cursor-grabbing"
      >
        <div className="flex items-center gap-2">
          <Icon className="w-4 h-4 text-primary" />
          <span className="font-medium text-sm">{app.appName}</span>
        </div>
        <div className="flex items-center gap-1">
          <button onClick={() => minimizeApp(app.id)} className="p-2 rounded hover:bg-white/10"><Minus size={14} /></button>
          <button onClick={() => toggleMaximize(app.id)} className="p-2 rounded hover:bg-white/10">
            {isMaximized ? <Copy size={14} /> : <Square size={14} />}
          </button>
          <button onClick={() => closeApp(app.id)} className="p-2 rounded hover:bg-red-500/50"><X size={14} /></button>
        </div>
      </motion.div>
      <div className="flex-1 bg-zinc-900/30 overflow-hidden">
        {renderAppContent()}
      </div>
    </motion.div>
  );
}