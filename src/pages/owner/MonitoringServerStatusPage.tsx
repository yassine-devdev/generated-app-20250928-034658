import React from 'react';
import { motion } from 'framer-motion';
import { Server, Cpu, HardDrive, MemoryStick } from 'lucide-react';
import { StatCard } from '@/components/StatCard';
import { ChartPlaceholder } from '@/components/ChartPlaceholder';
import { StatusIndicator } from '@/components/StatusIndicator';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
type Status = 'Operational' | 'Degraded' | 'Offline';
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
const servers: { name: string; status: Status; region: string }[] = [
  { name: 'API Server', status: 'Operational', region: 'us-east-1' },
  { name: 'Database Server', status: 'Operational', region: 'eu-west-1' },
  { name: 'Worker Server', status: 'Degraded', region: 'ap-southeast-1' },
  { name: 'Cache Server', status: 'Operational', region: 'us-west-2' },
  { name: 'Auth Server', status: 'Offline', region: 'sa-east-1' },
];
export function MonitoringServerStatusPage() {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-8"
    >
      <motion.h1 variants={itemVariants} className="text-3xl font-display font-bold">
        Server Status
      </motion.h1>
      <motion.div
        variants={containerVariants}
        className="grid gap-4 md:grid-cols-2 lg:grid-cols-4"
      >
        <motion.div variants={itemVariants}>
          <StatCard title="CPU Usage" value="72%" description="Avg. across all servers" icon={Cpu} />
        </motion.div>
        <motion.div variants={itemVariants}>
          <StatCard title="Memory Usage" value="64%" description="82.5 / 128 GB" icon={MemoryStick} />
        </motion.div>
        <motion.div variants={itemVariants}>
          <StatCard title="Disk Space" value="89%" description="8.9 / 10 TB" icon={HardDrive} />
        </motion.div>
        <motion.div variants={itemVariants}>
          <StatCard title="Servers Online" value="4 / 5" description="1 server is offline" icon={Server} />
        </motion.div>
      </motion.div>
      <motion.div variants={itemVariants} className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <ChartPlaceholder />
        </div>
        <Card className="glass-pane">
          <CardHeader>
            <CardTitle>Server List</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {servers.map((server) => (
                <div key={server.name} className="flex items-center justify-between p-2 rounded-md hover:bg-muted/50">
                  <div>
                    <p className="font-semibold">{server.name}</p>
                    <p className="text-xs text-muted-foreground">{server.region}</p>
                  </div>
                  <StatusIndicator status={server.status} />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}