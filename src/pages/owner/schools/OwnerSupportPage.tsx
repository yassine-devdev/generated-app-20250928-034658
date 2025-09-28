import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Ticket, PlusCircle } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
const mockTickets = [
  { id: 'TKT-1138', subject: 'Billing Question', school: 'Nova High', status: 'Open', updated: new Date(Date.now() - 3600000) },
  { id: 'TKT-1139', subject: 'Feature Request: Calendar Sync', school: 'Aetheris Academy', status: 'In Progress', updated: new Date(Date.now() - 86400000) },
  { id: 'TKT-1137', subject: 'User Import Issue', school: 'Quantum Prep', status: 'Closed', updated: new Date(Date.now() - 86400000 * 3) },
];
export function OwnerSupportPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="space-y-8"
    >
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-display font-bold">Support Center</h1>
        <Button><PlusCircle className="w-4 h-4 mr-2" /> New Ticket</Button>
      </div>
      <Card className="glass-pane">
        <CardHeader>
          <CardTitle>My Support Tickets</CardTitle>
          <CardDescription>View and manage your support requests.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Ticket ID</TableHead>
                <TableHead>Subject</TableHead>
                <TableHead>School</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Updated</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockTickets.map((ticket) => (
                <TableRow key={ticket.id}>
                  <TableCell className="font-mono">{ticket.id}</TableCell>
                  <TableCell className="font-medium">{ticket.subject}</TableCell>
                  <TableCell>{ticket.school}</TableCell>
                  <TableCell>
                    {ticket.status === 'Open' && <Badge variant="destructive">Open</Badge>}
                    {ticket.status === 'In Progress' && <Badge variant="secondary" className="bg-blue-500/20 text-blue-400 border-blue-500/30">In Progress</Badge>}
                    {ticket.status === 'Closed' && <Badge variant="outline">Closed</Badge>}
                  </TableCell>
                  <TableCell>{formatDistanceToNow(ticket.updated)} ago</TableCell>
                  <TableCell className="text-right">
                    <Dialog>
                      <DialogTrigger asChild><Button variant="outline" size="sm">View</Button></DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>{ticket.subject} ({ticket.id})</DialogTitle>
                        </DialogHeader>
                        <div className="py-4">
                          <p><strong>School:</strong> {ticket.school}</p>
                          <p><strong>Status:</strong> {ticket.status}</p>
                          <div className="mt-4 p-4 bg-muted/50 rounded-lg">
                            <p className="font-semibold">Latest Update:</p>
                            <p className="text-sm text-muted-foreground">Our team is looking into the billing discrepancy and will provide an update shortly.</p>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </motion.div>
  );
}