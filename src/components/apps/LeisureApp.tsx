import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Coffee, Film, Music } from 'lucide-react';
const leisureItems = [
  { title: 'The Art of the Perfect Espresso', category: 'Coffee', icon: Coffee, image: 'https://images.unsplash.com/photo-1511920183353-3c7c95a5742c?q=80&w=800' },
  { title: 'Top 10 Indie Films to Watch This Fall', category: 'Movies', icon: Film, image: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=800' },
  { title: 'Discovering Lo-fi: The Perfect Study Music', category: 'Music', icon: Music, image: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=800' },
  { title: 'A Guide to Local Coffee Roasters', category: 'Coffee', icon: Coffee, image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=800' },
];
export function LeisureApp() {
  return (
    <div className="p-6 h-full overflow-y-auto">
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
        }}
        initial="hidden"
        animate="visible"
      >
        {leisureItems.map((item, index) => (
          <motion.div key={index} variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
            <Card className="overflow-hidden group transition-all hover:shadow-xl hover:-translate-y-1 bg-zinc-900/50 border-white/10">
              <CardContent className="p-0">
                <div className="aspect-video overflow-hidden">
                  <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                </div>
              </CardContent>
              <CardFooter className="p-4 flex flex-col items-start">
                <Badge variant="secondary" className="mb-2">{item.category}</Badge>
                <h3 className="font-semibold text-lg">{item.title}</h3>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}