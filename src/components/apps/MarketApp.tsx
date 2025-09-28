import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';
const marketItems = [
  { name: 'Aetheris Pro Keyboard', price: 129.99, image: 'https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?q=80&w=800' },
  { name: 'Quantum Mouse', price: 79.99, image: 'https://images.unsplash.com/photo-1615663249853-2d4a7db7c8af?q=80&w=800' },
  { name: 'Nebula Desk Mat', price: 39.99, image: 'https://images.unsplash.com/photo-1595125990323-10874b74a216?q=80&w=800' },
  { name: 'Ergo-Chair Nova', price: 499.99, image: 'https://images.unsplash.com/photo-1580480055273-228ff5388ef8?q=80&w=800' },
];
export function MarketApp() {
  return (
    <div className="p-6 h-full overflow-y-auto">
      <motion.div
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
        }}
        initial="hidden"
        animate="visible"
      >
        {marketItems.map((item, index) => (
          <motion.div key={index} variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
            <Card className="overflow-hidden group transition-all hover:shadow-xl hover:-translate-y-1 bg-zinc-900/50 border-white/10">
              <CardContent className="p-0">
                <div className="aspect-square bg-muted overflow-hidden">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                </div>
              </CardContent>
              <CardFooter className="p-3 flex flex-col items-start">
                <h3 className="font-semibold text-sm truncate w-full">{item.name}</h3>
                <div className="flex justify-between items-center w-full mt-2">
                  <p className="font-bold text-primary">${item.price}</p>
                  <Button size="sm" variant="outline"><ShoppingCart className="w-4 h-4" /></Button>
                </div>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}