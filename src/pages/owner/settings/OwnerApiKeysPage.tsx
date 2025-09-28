import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { DataTable } from '@/components/data-table/DataTable';
import { columns } from '@/components/data-table/ApiKeyListColumns';
import { toast } from 'sonner';
import { Toaster } from '@/components/ui/sonner';
import { Row } from '@tanstack/react-table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Copy } from 'lucide-react';
export type ApiKey = {
  id: string;
  name: string;
  keyPrefix: string;
  createdAt: Date;
  lastUsed: Date | null;
};
const mockApiKeys: ApiKey[] = [
  { id: '1', name: 'Primary Server Key', keyPrefix: 'sk_live_abc...', createdAt: new Date(Date.now() - 86400000 * 30), lastUsed: new Date(Date.now() - 3600000) },
  { id: '2', name: 'Analytics Service Key', keyPrefix: 'sk_live_def...', createdAt: new Date(Date.now() - 86400000 * 90), lastUsed: new Date(Date.now() - 86400000) },
  { id: '3', name: 'Test Integration Key', keyPrefix: 'sk_test_ghi...', createdAt: new Date(Date.now() - 86400000 * 5), lastUsed: null },
];
export function OwnerApiKeysPage() {
  const [keys, setKeys] = useState<ApiKey[]>(mockApiKeys);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [newKeyName, setNewKeyName] = useState('');
  const [generatedKey, setGeneratedKey] = useState<string | null>(null);
  const handleRevoke = (row: Row<ApiKey>) => {
    setKeys(keys.filter(key => key.id !== row.original.id));
    toast.success(`API Key "${row.original.name}" has been revoked.`);
  };
  const handleCreateKey = () => {
    if (!newKeyName.trim()) {
      toast.error('Please provide a name for the API key.');
      return;
    }
    const newKey = `sk_live_${[...Array(24)].map(() => Math.random().toString(36)[2]).join('')}`;
    setGeneratedKey(newKey);
    setKeys([...keys, {
      id: `${keys.length + 1}`,
      name: newKeyName,
      keyPrefix: `${newKey.slice(0, 12)}...`,
      createdAt: new Date(),
      lastUsed: null,
    }]);
    setIsCreateDialogOpen(false);
    setNewKeyName('');
  };
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success('API Key copied to clipboard!');
  };
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <Toaster />
      <h1 className="text-3xl font-display font-bold mb-8">API Keys</h1>
      <DataTable
        columns={columns}
        data={keys}
        filterColumnId="name"
        filterPlaceholder="Filter by key name..."
        onAddUser={() => setIsCreateDialogOpen(true)}
        onEditRow={() => {}} // Not used
        onDeleteRow={handleRevoke}
      />
      {/* Create Key Dialog */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New API Key</DialogTitle>
            <DialogDescription>Give your new key a descriptive name to remember its purpose.</DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Label htmlFor="key-name">Key Name</Label>
            <Input id="key-name" value={newKeyName} onChange={(e) => setNewKeyName(e.target.value)} placeholder="e.g., Production Server" />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleCreateKey}>Create Key</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      {/* Show Generated Key Dialog */}
      <Dialog open={!!generatedKey} onOpenChange={() => setGeneratedKey(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>API Key Created Successfully</DialogTitle>
            <DialogDescription>
              This is the only time you will see this key. Copy it and store it securely.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4 relative">
            <Input readOnly value={generatedKey || ''} className="pr-10 font-mono" />
            <Button size="icon" variant="ghost" className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8" onClick={() => copyToClipboard(generatedKey || '')}>
              <Copy className="h-4 w-4" />
            </Button>
          </div>
          <DialogFooter>
            <Button onClick={() => setGeneratedKey(null)}>Done</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </motion.div>
  );
}