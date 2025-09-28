import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Paintbrush, Languages, Bell } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};
const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};
export function OwnerGeneralSettingsPage() {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-8"
    >
      <motion.div variants={itemVariants}>
        <h1 className="text-3xl font-display font-bold">General Settings</h1>
        <p className="text-muted-foreground">Manage your platform's general appearance and behavior.</p>
      </motion.div>
      <motion.div variants={itemVariants}>
        <Card className="glass-pane">
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Paintbrush className="w-5 h-5 text-primary" /> Branding</CardTitle>
            <CardDescription>Customize the look and feel of your platform.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center gap-6">
              <Avatar className="h-20 w-20">
                <AvatarImage src="https://i.pravatar.cc/150?u=logo" />
                <AvatarFallback>AA</AvatarFallback>
              </Avatar>
              <div>
                <Label htmlFor="logo-upload">Platform Logo</Label>
                <Input id="logo-upload" type="file" className="mt-1" />
                <p className="text-xs text-muted-foreground mt-1">PNG, JPG, SVG up to 5MB.</p>
              </div>
            </div>
            <div className="space-y-2">
              <Label>Primary Color</Label>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-md border border-white/20" style={{ backgroundColor: '#4338CA' }} />
                <Input defaultValue="#4338CA" className="max-w-xs" />
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
      <motion.div variants={itemVariants}>
        <Card className="glass-pane">
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Languages className="w-5 h-5 text-primary" /> Language & Region</CardTitle>
            <CardDescription>Set the default language and timezone for your platform.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Default Language</Label>
              <Select defaultValue="en-us">
                <SelectTrigger className="max-w-xs">
                  <SelectValue placeholder="Select language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en-us">English (United States)</SelectItem>
                  <SelectItem value="es-es">Español (España)</SelectItem>
                  <SelectItem value="fr-fr">Français (France)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
      </motion.div>
      <motion.div variants={itemVariants}>
        <Card className="glass-pane">
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Bell className="w-5 h-5 text-primary" /> Notification Preferences</CardTitle>
            <CardDescription>Manage how you receive notifications.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <Label htmlFor="email-notifications" className="font-semibold">Email Notifications</Label>
                <p className="text-xs text-muted-foreground">Receive important updates via email.</p>
              </div>
              <Switch id="email-notifications" defaultChecked />
            </div>
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <Label htmlFor="weekly-reports" className="font-semibold">Weekly Summary Reports</Label>
                <p className="text-xs text-muted-foreground">Get a weekly summary of platform activity.</p>
              </div>
              <Switch id="weekly-reports" />
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}