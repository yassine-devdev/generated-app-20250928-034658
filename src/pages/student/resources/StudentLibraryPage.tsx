import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, FileText, Video, Link as LinkIcon } from 'lucide-react';
const mockResources = [
  { title: 'Algebra 1 Textbook', type: 'PDF', icon: FileText, subject: 'Math' },
  { title: 'Photosynthesis Explained', type: 'Video', icon: Video, subject: 'Science' },
  { title: 'The Great Gatsby Full Text', type: 'Link', icon: LinkIcon, subject: 'English' },
  { title: 'Interactive Mitosis Simulation', type: 'Link', icon: LinkIcon, subject: 'Science' },
  { title: 'Shakespeare Sonnets', type: 'PDF', icon: FileText, subject: 'English' },
  { title: 'WWII Documentary', type: 'Video', icon: Video, subject: 'History' },
];
export function StudentLibraryPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="space-y-8"
    >
      <div>
        <h1 className="text-3xl font-display font-bold">Digital Library</h1>
        <p className="text-muted-foreground">Find resources, textbooks, and videos for your classes.</p>
      </div>
      <div className="relative max-w-lg">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <Input placeholder="Search for resources..." className="pl-10 text-lg h-12" />
      </div>
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
        }}
        initial="hidden"
        animate="visible"
      >
        {mockResources.map((res, index) => (
          <motion.div key={index} variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
            <Card className="h-full flex flex-col justify-between group transition-all hover:shadow-xl hover:-translate-y-1 bg-zinc-900/50 border-white/10 hover:border-primary/50">
              <CardContent className="p-6 flex items-start gap-4">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <res.icon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="font-semibold">{res.title}</p>
                  <p className="text-sm text-muted-foreground">{res.type}</p>
                </div>
              </CardContent>
              <CardFooter className="p-4 pt-0">
                <Badge variant="secondary">{res.subject}</Badge>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}