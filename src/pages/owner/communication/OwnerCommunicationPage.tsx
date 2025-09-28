import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, Pencil } from 'lucide-react';
const mockInbox = [
  { id: 1, sender: 'Aetheris Academy', subject: 'Onboarding Complete', snippet: 'Welcome! We are excited to have you on board...', avatar: 'https://i.pravatar.cc/150?u=school1' },
  { id: 2, sender: 'Nova High', subject: 'Billing Question', snippet: 'We have a question regarding our latest invoice...', avatar: 'https://i.pravatar.cc/150?u=school2' },
  { id: 3, sender: 'Support Team', subject: 'Ticket #1138 Update', snippet: 'Your support ticket has been updated. Please review...', avatar: 'https://i.pravatar.cc/150?u=support' },
];
const mockTemplates = [
    { id: 1, name: 'Welcome Email', category: 'Onboarding' },
    { id: 2, name: 'Invoice Due Reminder', category: 'Billing' },
    { id: 3, name: 'System Update', category: 'Announcements' },
];
export function OwnerCommunicationPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="space-y-8"
    >
      <h1 className="text-3xl font-display font-bold">Communication Center</h1>
      <Tabs defaultValue="inbox">
        <TabsList>
          <TabsTrigger value="inbox">Inbox</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
        </TabsList>
        <TabsContent value="inbox">
          <Card className="glass-pane">
            <div className="grid grid-cols-1 md:grid-cols-3 h-[600px]">
              <div className="md:col-span-1 border-r border-white/10 flex flex-col">
                <div className="p-4 border-b border-white/10">
                  <div className="relative">
                    <Search className="absolute left-2 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input placeholder="Search mail..." className="pl-8 bg-zinc-900" />
                  </div>
                </div>
                <div className="flex-1 overflow-y-auto">
                  {mockInbox.map(mail => (
                    <div key={mail.id} className="p-4 border-b border-white/10 hover:bg-muted/50 cursor-pointer">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8"><AvatarImage src={mail.avatar} /><AvatarFallback>{mail.sender.charAt(0)}</AvatarFallback></Avatar>
                        <div>
                          <p className="font-semibold text-sm">{mail.sender}</p>
                          <p className="text-xs text-muted-foreground">{mail.subject}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="md:col-span-2 p-6">
                <h2 className="text-2xl font-bold mb-2">Onboarding Complete</h2>
                <p className="text-muted-foreground">From: Aetheris Academy</p>
                <div className="mt-8 prose prose-invert max-w-none">
                  <p>Welcome! We are excited to have you on board. Your school profile is now active and you can begin adding users.</p>
                  <p>Let us know if you need any assistance.</p>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>
        <TabsContent value="templates">
          <Card className="glass-pane">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Email Templates</CardTitle>
              <Button><Pencil className="w-4 h-4 mr-2" /> New Template</Button>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {mockTemplates.map(template => (
                  <li key={template.id} className="p-3 bg-muted/50 rounded-lg flex justify-between items-center">
                    <p className="font-medium">{template.name}</p>
                    <p className="text-sm text-muted-foreground">{template.category}</p>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </motion.div>
  );
}