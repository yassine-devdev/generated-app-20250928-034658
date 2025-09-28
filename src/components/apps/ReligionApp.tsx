import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookOpen, Calendar, Users } from 'lucide-react';
const items = [
  { title: 'Sacred Texts', icon: BookOpen, description: 'Explore a library of sacred writings and commentaries.', button: 'Read Now' },
  { title: 'Community Events', icon: Calendar, description: 'Find local and virtual gatherings, services, and events.', button: 'View Calendar' },
  { title: 'Discussion Groups', icon: Users, description: 'Join groups to discuss topics and connect with others.', button: 'Find a Group' },
];
export function ReligionApp() {
  return (
    <div className="p-6 h-full overflow-y-auto">
      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
        }}
        initial="hidden"
        animate="visible"
      >
        {items.map((item, index) => (
          <motion.div key={index} variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
            <Card className="text-center h-full flex flex-col bg-zinc-900/50 border-white/10">
              <CardHeader>
                <item.icon className="w-10 h-10 text-primary mx-auto mb-2" />
                <CardTitle>{item.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex-1">
                <p className="text-muted-foreground text-sm">{item.description}</p>
              </CardContent>
              <div className="p-4">
                <Button variant="outline">{item.button}</Button>
              </div>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}