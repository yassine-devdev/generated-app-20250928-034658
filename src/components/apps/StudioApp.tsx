import React from 'react';
import { AppContainer } from './AppContainer';
import { appsNavigationData } from '@/lib/appsNavigation';
import { motion } from 'framer-motion';
import { StudioEditorLayout } from './studio/StudioEditorLayout';
const ContentPlaceholder = ({ title }: { title: string }) => (
  <motion.div
    key={title}
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    className="w-full h-full flex items-center justify-center bg-zinc-800/50 rounded-lg border border-dashed border-white/10"
  >
    <h2 className="text-2xl font-display text-muted-foreground">{title}</h2>
  </motion.div>
);
export function StudioApp() {
  const navData = appsNavigationData.Studio;
  const renderContent = (activeSubnav: string) => {
    if (activeSubnav === 'canvas') {
      return <StudioEditorLayout />;
    }
    // Find the name for the placeholder
    const activeHeader = navData.find(h => h.subnav.some(s => s.key === activeSubnav));
    const subnavItem = activeHeader?.subnav.find(s => s.key === activeSubnav);
    const title = subnavItem ? subnavItem.name : "Studio";
    return <ContentPlaceholder title={`${title} View`} />;
  };
  return (
    <AppContainer navData={navData}>
      {(activeSubnav) => renderContent(activeSubnav)}
    </AppContainer>
  );
}