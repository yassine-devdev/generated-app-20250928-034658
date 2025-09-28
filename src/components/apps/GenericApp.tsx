import React from 'react';
import { AppContainer } from './AppContainer';
import { appsNavigationData } from '@/lib/appsNavigation';
import { AppName } from '@/store/overlayStore';
import { motion } from 'framer-motion';
interface GenericAppProps {
  appName: AppName;
}
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
export function GenericApp({ appName }: GenericAppProps) {
  const navData = appsNavigationData[appName];
  if (!navData || navData.length === 0) {
    return <ContentPlaceholder title={`${appName} App`} />;
  }
  const renderContent = (activeSubnav: string) => {
    const activeHeader = navData.find(h => h.subnav.some(s => s.key === activeSubnav));
    const subnavItem = activeHeader?.subnav.find(s => s.key === activeSubnav);
    const title = subnavItem ? subnavItem.name : appName;
    return <ContentPlaceholder title={title} />;
  };
  return (
    <AppContainer navData={navData}>
      {(activeSubnav) => renderContent(activeSubnav)}
    </AppContainer>
  );
}