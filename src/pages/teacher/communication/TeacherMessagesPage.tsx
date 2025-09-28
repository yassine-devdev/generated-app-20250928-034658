import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Send, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
const mockContacts = [
  { name: 'Cassiopeia Minor', relation: 'Parent of Leo', avatar: 'https://i.pravatar.cc/150?u=cass' },
  { name: 'Orion Stark', relation: 'School Admin', avatar: 'https://i.pravatar.cc/150?u=orion' },
];
const mockMessages = [
  { from: 'Cassiopeia Minor', text: 'Hello, I had a question about Leo\'s upcoming assignment.', time: '9:15 AM', self: false },
  { from: 'You', text: 'Of course, I\'m happy to help. Which assignment are you referring to?', time: '9:16 AM', self: true },
];
export function TeacherMessagesPage() {
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
            <div className="p-4 border-b border-white/10">
              <div className="relative">
                <Search className="absolute left-2 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input placeholder="Search contacts..." className="pl-8 bg-zinc-900" />
              </div>
            </div>
            <div className="flex-1 overflow-y-auto">
              {mockContacts.map(contact => (
                <div key={contact.name} className="p-4 border-b border-white/10 hover:bg-muted/50 cursor-pointer flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={contact.avatar} />
                    <AvatarFallback>{contact.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold">{contact.name}</p>
                    <p className="text-xs text-muted-foreground">{contact.relation}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="md:col-span-2 flex flex-col">
            <CardHeader className="border-b border-white/10">
              <CardTitle>Cassiopeia Minor</CardTitle>
            </CardHeader>
            <CardContent className="flex-1 p-4 overflow-y-auto space-y-4">
              {mockMessages.map((msg, index) => (
                <div key={index} className={`flex items-end gap-2 ${msg.self ? 'justify-end' : 'justify-start'}`}>
                  {!msg.self && <Avatar className="h-8 w-8"><AvatarImage src={mockContacts[0].avatar} /><AvatarFallback>C</AvatarFallback></Avatar>}
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