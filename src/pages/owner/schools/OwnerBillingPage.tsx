import React from 'react';
import { motion } from 'framer-motion';
import { StatCard } from '@/components/StatCard';
import { DollarSign, CreditCard, Users, FileText } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
const mockInvoices = [
  { id: 'INV-1234', school: 'Aetheris Academy', amount: 1200.00, status: 'Paid', date: new Date() },
  { id: 'INV-1235', school: 'Nova High', amount: 950.00, status: 'Paid', date: new Date(Date.now() - 86400000 * 2) },
  { id: 'INV-1236', school: 'Quantum Prep', amount: 1500.00, status: 'Due', date: new Date(Date.now() + 86400000 * 10) },
  { id: 'INV-1237', school: 'Galaxy Elementary', amount: 800.00, status: 'Overdue', date: new Date(Date.now() - 86400000 * 5) },
];
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};
const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 },
};
export function OwnerBillingPage() {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-8"
    >
      <motion.h1 variants={itemVariants} className="text-3xl font-display font-bold">
        School Billing
      </motion.h1>
      <motion.div
        variants={containerVariants}
        className="grid gap-4 md:grid-cols-2 lg:grid-cols-4"
      >
        <motion.div variants={itemVariants}>
          <StatCard title="Monthly Recurring Revenue" value="$152,300" description="+5.2% this month" icon={DollarSign} />
        </motion.div>
        <motion.div variants={itemVariants}>
          <StatCard title="Active Subscriptions" value="1,482" description="Across 150 schools" icon={CreditCard} />
        </motion.div>
        <motion.div variants={itemVariants}>
          <StatCard title="New Trials" value="32" description="In the last 30 days" icon={Users} />
        </motion.div>
        <motion.div variants={itemVariants}>
          <StatCard title="Overdue Invoices" value="12" description="$10,800 total" icon={FileText} />
        </motion.div>
      </motion.div>
      <motion.div variants={itemVariants}>
        <Card className="glass-pane">
          <CardHeader><CardTitle>Recent Invoices</CardTitle></CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>School</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockInvoices.map(inv => (
                  <TableRow key={inv.id}>
                    <TableCell className="font-medium">{inv.school}</TableCell>
                    <TableCell>${inv.amount.toFixed(2)}</TableCell>
                    <TableCell>
                      {inv.status === 'Paid' && <Badge variant="secondary" className="bg-green-500/20 text-green-400 border-green-500/30">Paid</Badge>}
                      {inv.status === 'Due' && <Badge variant="secondary" className="bg-blue-500/20 text-blue-400 border-blue-500/30">Due</Badge>}
                      {inv.status === 'Overdue' && <Badge variant="destructive">Overdue</Badge>}
                    </TableCell>
                    <TableCell>{format(inv.date, 'PP')}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}