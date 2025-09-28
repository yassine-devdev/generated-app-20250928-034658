import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Globe, Palette, Image as ImageIcon } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};
const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 },
};
export function OwnerWhiteLabelingPage() {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-8"
    >
      <motion.div variants={itemVariants}>
        <h1 className="text-3xl font-display font-bold">White Labeling</h1>
        <p className="text-muted-foreground">Customize the platform to match your brand.</p>
      </motion.div>
      <motion.div variants={itemVariants}>
        <Card className="glass-pane">
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Globe className="w-5 h-5 text-primary" /> Custom Domain</CardTitle>
            <CardDescription>Set up a custom domain for your school's portal.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="custom-domain">Your Custom Domain</Label>
              <div className="flex gap-2">
                <Input id="custom-domain" placeholder="e.g., portal.yourschool.com" />
                <Button>Save</Button>
              </div>
              <p className="text-xs text-muted-foreground">You will need to add a CNAME record in your DNS settings.</p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
      <motion.div variants={itemVariants}>
        <Card className="glass-pane">
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><ImageIcon className="w-5 h-5 text-primary" /> Logos</CardTitle>
            <CardDescription>Upload your school's logos for different parts of the application.</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16 rounded-md"><AvatarImage src="https://i.pravatar.cc/150?u=logo1" /><AvatarFallback>L</AvatarFallback></Avatar>
              <div>
                <Label htmlFor="main-logo">Main Logo</Label>
                <Input id="main-logo" type="file" className="mt-1" />
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16 rounded-full"><AvatarImage src="https://i.pravatar.cc/150?u=favicon" /><AvatarFallback>F</AvatarFallback></Avatar>
              <div>
                <Label htmlFor="favicon">Favicon</Label>
                <Input id="favicon" type="file" className="mt-1" />
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
      <motion.div variants={itemVariants}>
        <Card className="glass-pane">
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Palette className="w-5 h-5 text-primary" /> Theme Customization</CardTitle>
            <CardDescription>Adjust the color scheme to match your brand identity.</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label>Primary Color</Label>
              <Input type="color" defaultValue="#4338CA" className="p-1 h-10" />
            </div>
            <div className="space-y-2">
              <Label>Accent Color</Label>
              <Input type="color" defaultValue="#14B8A6" className="p-1 h-10" />
            </div>
            <div className="space-y-2">
              <Label>Background</Label>
              <Input type="color" defaultValue="#09090B" className="p-1 h-10" />
            </div>
            <div className="space-y-2">
              <Label>Text Color</Label>
              <Input type="color" defaultValue="#F1F5F9" className="p-1 h-10" />
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}