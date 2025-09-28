import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, Camera, Brush, Code } from 'lucide-react';
const hobbyGroups = [
  { name: 'Photography Club', members: 128, icon: Camera, image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=800' },
  { name: 'Digital Art Collective', members: 76, icon: Brush, image: 'https://images.unsplash.com/photo-1583141235013-a655c1004a6e?q=80&w=800' },
  { name: 'Creative Coding', members: 92, icon: Code, image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800' },
];
export function HobbiesApp() {
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
        {hobbyGroups.map((group, index) => (
          <motion.div key={index} variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
            <Card className="overflow-hidden group transition-all hover:shadow-xl bg-zinc-900/50 border-white/10 text-center">
              <CardContent className="p-0">
                <div className="h-32 bg-muted flex items-center justify-center relative overflow-hidden">
                  <img src={group.image} alt={group.name} className="w-full h-full object-cover absolute inset-0" />
                  <div className="absolute inset-0 bg-black/50" />
                  <group.icon className="w-12 h-12 text-white z-10" />
                </div>
              </CardContent>
              <CardFooter className="p-4 flex flex-col items-center">
                <h3 className="font-semibold text-lg">{group.name}</h3>
                <div className="flex items-center gap-2 text-muted-foreground text-sm my-2">
                  <Users className="w-4 h-4" /> {group.members} members
                </div>
                <Button>Join Group</Button>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}