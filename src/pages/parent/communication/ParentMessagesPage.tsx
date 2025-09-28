import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Send, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
const mockTeachers = [
  { name: 'Lyra Vega', subject: 'Math', avatar: 'https://i.pravatar.cc/150?u=lyra' },
  { name: 'Orion Stark', subject: 'English', avatar: 'https://i.pravatar.cc/150?u=orion' },
];
const mockMessages = [
  { from: 'Lyra Vega', text: 'Hi there! Just a reminder that the math test is this Friday.', time: '10:30 AM', self: false },
  { from: 'You', text: 'Thanks for the reminder! We will make sure Leo is prepared.', time: '10:32 AM', self: true },
];
export function ParentMessagesPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="space-y-8"
    >
      <h1 className="text-3xl font-display font-bold">Messages</h1>
      <Card className="glass-pane">
        <div className="grid grid-cols-1 md:grid-cols-3 h-[600px]">
          <div className="md:col-span-1 border-r border-white/10 flex flex-col">
            <CardHeader>
              <CardTitle>Teachers</CardTitle>
            </CardHeader>
            <div className="flex-1 overflow-y-auto">
              {mockTeachers.map(teacher => (
                <div key={teacher.name} className="p-4 border-b border-white/10 hover:bg-muted/50 cursor-pointer flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={teacher.avatar} />
                    <AvatarFallback>{teacher.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold">{teacher.name}</p>
                    <p className="text-xs text-muted-foreground">{teacher.subject} Teacher</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="md:col-span-2 flex flex-col">
            <CardHeader className="border-b border-white/10">
              <CardTitle>Lyra Vega</CardTitle>
            </CardHeader>
            <CardContent className="flex-1 p-4 overflow-y-auto space-y-4">
              {mockMessages.map((msg, index) => (
                <div key={index} className={`flex items-end gap-2 ${msg.self ? 'justify-end' : 'justify-start'}`}>
                  {!msg.self && <Avatar className="h-8 w-8"><AvatarImage src={mockTeachers[0].avatar} /><AvatarFallback>L</AvatarFallback></Avatar>}
                  <div className={`max-w-xs p-3 rounded-lg ${msg.self ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                    <p className="text-sm">{msg.text}</p>
                  </div>
                </div>
              ))}
            </CardContent>
            <div className="p-4 border-t border-white/10 flex items-center gap-2">
              <Textarea placeholder="Type your message..." className="flex-1" />
              <Button size="icon"><Send className="w-4 h-4" /></Button>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}