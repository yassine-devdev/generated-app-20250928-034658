import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
const lifestyleArticles = [
  { title: '10 Habits for a More Productive Morning', author: 'Jane Doe', avatar: 'https://i.pravatar.cc/150?u=jane', image: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?q=80&w=800' },
  { title: 'The Art of Mindful Work: Finding Focus', author: 'John Smith', avatar: 'https://i.pravatar.cc/150?u=john', image: 'https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?q=80&w=800' },
  { title: 'Designing Your Ideal Workspace', author: 'Emily White', avatar: 'https://i.pravatar.cc/150?u=emily', image: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=800' },
];
export function LifestyleApp() {
  return (
    <div className="p-6 h-full overflow-y-auto">
      <motion.div
        className="space-y-6"
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
        }}
        initial="hidden"
        animate="visible"
      >
        {lifestyleArticles.map((article, index) => (
          <motion.div key={index} variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
            <Card className="flex flex-col md:flex-row overflow-hidden group transition-all hover:shadow-xl bg-zinc-900/50 border-white/10">
              <div className="md:w-1/3 h-48 md:h-auto overflow-hidden">
                <img src={article.image} alt={article.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
              </div>
              <div className="md:w-2/3 flex flex-col">
                <CardContent className="p-4 flex-1">
                  <h3 className="font-semibold text-xl mb-2">{article.title}</h3>
                  <p className="text-muted-foreground text-sm line-clamp-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                </CardContent>
                <CardFooter className="p-4 flex items-center gap-2">
                  <Avatar className="h-8 w-8"><AvatarImage src={article.avatar} /><AvatarFallback>{article.author.charAt(0)}</AvatarFallback></Avatar>
                  <span className="text-sm font-medium">{article.author}</span>
                </CardFooter>
              </div>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}