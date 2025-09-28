import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin } from 'lucide-react';
const events = [
  { title: 'Tech Summit 2024', date: 'NOV 28', time: '9:00 AM', location: 'Virtual', category: 'Technology' },
  { title: 'Design Forward Conference', date: 'DEC 05', time: '10:00 AM', location: 'Innovation Hall', category: 'Design' },
  { title: 'Winter CodeFest', date: 'DEC 12', time: 'All Day', location: 'Online', category: 'Development' },
];
export function EventsApp() {
  return (
    <div className="p-6 h-full overflow-y-auto">
      <motion.div
        className="space-y-4"
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
        }}
        initial="hidden"
        animate="visible"
      >
        {events.map((event, index) => (
          <motion.div key={index} variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
            <Card className="transition-all hover:shadow-lg bg-zinc-900/50 border-white/10 hover:border-primary/50">
              <CardContent className="p-4 flex items-center gap-4">
                <div className="text-center border-r pr-4 border-white/10">
                  <p className="font-bold text-2xl text-primary">{event.date.split(' ')[1]}</p>
                  <p className="text-sm text-muted-foreground">{event.date.split(' ')[0]}</p>
                </div>
                <div className="flex-1">
                  <Badge className="mb-1">{event.category}</Badge>
                  <h3 className="font-semibold text-lg">{event.title}</h3>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground mt-1">
                    <span>{event.time}</span>
                    <div className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {event.location}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}