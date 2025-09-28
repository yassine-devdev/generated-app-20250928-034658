import React from 'react';
import { AppContainer } from './AppContainer';
import { appsNavigationData } from '@/lib/appsNavigation';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Trophy, ShieldCheck, Star, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';
const mockLeaderboard = [
  { rank: 1, name: 'Alex Ryder', score: 15200, avatar: 'https://i.pravatar.cc/150?u=alex' },
  { rank: 2, name: 'Lyra Vega', score: 14850, avatar: 'https://i.pravatar.cc/150?u=lyra' },
  { rank: 3, name: 'Orion Stark', score: 13900, avatar: 'https://i.pravatar.cc/150?u=orion' },
  { rank: 4, name: 'Leo Minor', score: 12500, avatar: 'https://i.pravatar.cc/150?u=leo' },
  { rank: 5, name: 'Cassiopeia Minor', score: 11800, avatar: 'https://i.pravatar.cc/150?u=cass' },
];
const mockAchievements = [
  { name: 'First Steps', desc: 'Complete your first task', icon: Star, unlocked: true },
  { name: 'Streak Master', desc: 'Maintain a 7-day streak', icon: Zap, unlocked: true },
  { name: 'Collaborator', desc: 'Work on a team project', icon: ShieldCheck, unlocked: false },
  { name: 'Top Performer', desc: 'Reach the top 10 on the leaderboard', icon: Trophy, unlocked: false },
];
const LeaderboardView = () => (
  <Card className="h-full bg-zinc-800/50 border-dashed border-white/10">
    <CardHeader>
      <CardTitle className="flex items-center gap-2"><Trophy className="text-yellow-400" /> Weekly Leaderboard</CardTitle>
    </CardHeader>
    <CardContent>
      <ul className="space-y-2">
        {mockLeaderboard.map((user, index) => (
          <motion.li
            key={user.rank}
            className={cn(
              "flex items-center gap-4 p-2 rounded-lg",
              user.rank <= 3 ? "bg-yellow-400/10" : "bg-muted/30"
            )}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <span className="font-bold text-lg w-6 text-center">{user.rank}</span>
            <Avatar>
              <AvatarImage src={user.avatar} />
              <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <span className="flex-1 font-medium">{user.name}</span>
            <span className="font-bold text-primary">{user.score.toLocaleString()} pts</span>
          </motion.li>
        ))}
      </ul>
    </CardContent>
  </Card>
);
const AchievementsView = () => (
  <Card className="h-full bg-zinc-800/50 border-dashed border-white/10">
    <CardHeader><CardTitle>Achievements</CardTitle></CardHeader>
    <CardContent className="grid grid-cols-2 gap-4">
      {mockAchievements.map((ach, index) => (
        <motion.div
          key={ach.name}
          className={cn(
            "flex flex-col items-center text-center p-4 rounded-lg border",
            ach.unlocked ? "bg-primary/10 border-primary/30" : "bg-muted/30 border-white/10"
          )}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.1 }}
        >
          <div className={cn("w-16 h-16 rounded-full flex items-center justify-center mb-2", ach.unlocked ? "bg-primary text-primary-foreground" : "bg-muted")}>
            <ach.icon className="w-8 h-8" />
          </div>
          <p className="font-semibold">{ach.name}</p>
          <p className="text-xs text-muted-foreground">{ach.desc}</p>
        </motion.div>
      ))}
    </CardContent>
  </Card>
);
export function GamificationApp() {
  const navData = appsNavigationData.Gamification;
  const renderContent = (activeSubnav: string) => {
    switch (activeSubnav) {
      case 'leaderboard':
        return <LeaderboardView />;
      case 'achievements':
        return <AchievementsView />;
      default:
        return <LeaderboardView />;
    }
  };
  return (
    <AppContainer navData={navData}>
      {(activeSubnav) => renderContent(activeSubnav)}
    </AppContainer>
  );
}