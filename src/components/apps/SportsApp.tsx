import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Flame } from 'lucide-react';
const games = [
  { teamA: 'Cosmic Comets', scoreA: 102, teamB: 'Galaxy Gladiators', scoreB: 98, status: 'Final' },
  { teamA: 'Solar Flares', scoreA: 88, teamB: 'Nebula Knights', scoreB: 91, status: 'Final' },
  { teamA: 'Orion Orbits', scoreA: 56, teamB: 'Vortex Vipers', scoreB: 45, status: 'Q3 - 2:15' },
];
export function SportsApp() {
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
        <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
          <Card className="bg-zinc-900/50 border-white/10">
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Flame className="text-primary" /> Top Games</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {games.map((game, index) => (
                <div key={index} className="p-3 bg-muted/30 rounded-lg flex items-center justify-between">
                  <div className="flex-1 text-right pr-4">
                    <span className="font-medium">{game.teamA}</span>
                  </div>
                  <div className="text-center">
                    <div className="flex gap-2 font-bold text-2xl">
                      <span>{game.scoreA}</span>
                      <span>-</span>
                      <span>{game.scoreB}</span>
                    </div>
                    <Badge variant={game.status.startsWith('Final') ? 'secondary' : 'destructive'}>{game.status}</Badge>
                  </div>
                  <div className="flex-1 pl-4">
                    <span className="font-medium">{game.teamB}</span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  );
}