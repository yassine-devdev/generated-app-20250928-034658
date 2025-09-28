import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Users, Shield, Fingerprint } from 'lucide-react';
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
export function OwnerSecurityPage() {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-8"
    >
      <motion.div variants={itemVariants}>
        <h1 className="text-3xl font-display font-bold">Security Settings</h1>
        <p className="text-muted-foreground">Manage your organization's security policies and access controls.</p>
      </motion.div>
      <motion.div variants={itemVariants}>
        <Card className="glass-pane">
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Users className="w-5 h-5 text-primary" /> Roles & Permissions</CardTitle>
            <CardDescription>Define what users can see and do within the platform.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Manage detailed role-based access control (RBAC) for Owners, School Admins, Teachers, and more.
            </p>
            <Button>Manage Roles</Button>
          </CardContent>
        </Card>
      </motion.div>
      <motion.div variants={itemVariants}>
        <Card className="glass-pane">
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Shield className="w-5 h-5 text-primary" /> Two-Factor Authentication (2FA)</CardTitle>
            <CardDescription>Add an extra layer of security to user accounts.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <Label htmlFor="2fa-enforcement" className="font-semibold">Enforce 2FA for all users</Label>
                <p className="text-xs text-muted-foreground">Require all users in your organization to set up 2FA.</p>
              </div>
              <Switch id="2fa-enforcement" />
            </div>
          </CardContent>
        </Card>
      </motion.div>
      <motion.div variants={itemVariants}>
        <Card className="glass-pane">
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Fingerprint className="w-5 h-5 text-primary" /> Single Sign-On (SSO)</CardTitle>
            <CardDescription>Allow users to log in using your organization's identity provider.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="sso-entity-id">Entity ID</Label>
              <Input id="sso-entity-id" placeholder="e.g., https://your-idp.com/saml2" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="sso-url">SSO URL</Label>
              <Input id="sso-url" placeholder="e.g., https://your-idp.com/sso/saml" />
            </div>
            <Button>Save SSO Configuration</Button>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}