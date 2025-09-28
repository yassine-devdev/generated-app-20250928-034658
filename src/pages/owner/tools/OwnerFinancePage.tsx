import React from 'react';
import { motion } from 'framer-motion';
import { StatCard } from '@/components/StatCard';
import { DollarSign, Landmark, CreditCard, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
const mockTransactions = [
  { id: 'txn_1', school: 'Aetheris Academy', amount: 1200.00, status: 'Paid', date: new Date() },
  { id: 'txn_2', school: 'Nova High', amount: 950.00, status: 'Paid', date: new Date(Date.now() - 86400000 * 2) },
  { id: 'txn_3', school: 'Quantum Prep', amount: 1500.00, status: 'Pending', date: new Date(Date.now() - 86400000 * 3) },
  { id: 'txn_4', school: 'Galaxy Elementary', amount: 800.00, status: 'Failed', date: new Date(Date.now() - 86400000 * 5) },
];
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};
const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 },
};
export function OwnerFinancePage() {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-8"
    >
      <motion.h1 variants={itemVariants} className="text-3xl font-display font-bold">
        Finance Overview
      </motion.h1>
      <motion.div
        variants={containerVariants}
        className="grid gap-4 md:grid-cols-2 lg:grid-cols-4"
      >
        <motion.div variants={itemVariants}>
          <StatCard title="Total Revenue" value="$1,250,830" description="+12.5% this month" icon={DollarSign} />
        </motion.div>
        <motion.div variants={itemVariants}>
          <StatCard title="Net Profit" value="$450,210" description="36% Margin" icon={TrendingUp} />
        </motion.div>
        <motion.div variants={itemVariants}>
          <StatCard title="Pending Payouts" value="$45,500" description="Next payout in 3 days" icon={Landmark} />
        </motion.div>
        <motion.div variants={itemVariants}>
          <StatCard title="Active Subscriptions" value="1,482" description="+52 this week" icon={CreditCard} />
        </motion.div>
      </motion.div>
      <motion.div variants={itemVariants}>
        <Card className="glass-pane">
          <CardHeader><CardTitle>Recent Transactions</CardTitle></CardHeader>
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
                {mockTransactions.map(txn => (
                  <TableRow key={txn.id}>
                    <TableCell className="font-medium">{txn.school}</TableCell>
                    <TableCell>${txn.amount.toFixed(2)}</TableCell>
                    <TableCell>
                      {txn.status === 'Paid' && <Badge variant="secondary" className="bg-green-500/20 text-green-400 border-green-500/30">Paid</Badge>}
                      {txn.status === 'Pending' && <Badge variant="secondary" className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">Pending</Badge>}
                      {txn.status === 'Failed' && <Badge variant="destructive">Failed</Badge>}
                    </TableCell>
                    <TableCell>{format(txn.date, 'PP')}</TableCell>
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