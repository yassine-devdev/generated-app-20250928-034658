import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { BrainCircuit, Atom, Landmark } from 'lucide-react';
const courses = [
  { title: 'Introduction to Quantum Physics', category: 'Science', icon: Atom, progress: 75, image: 'https://images.unsplash.com/photo-1581093450021-4a7360e9a1b8?q=80&w=800' },
  { title: 'AI and Machine Learning Fundamentals', category: 'Technology', icon: BrainCircuit, progress: 45, image: 'https://images.unsplash.com/photo-1599058917212-d750089bc07e?q=80&w=800' },
  { title: 'The History of Ancient Rome', category: 'History', icon: Landmark, progress: 90, image: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?q=80&w=800' },
];
export function KnowledgeApp() {
  return (
    <div className="p-6 h-full overflow-y-auto">
      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
        }}
        initial="hidden"
        animate="visible"
      >
        {courses.map((course, index) => (
          <motion.div key={index} variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
            <Card className="overflow-hidden group transition-all hover:shadow-xl bg-zinc-900/50 border-white/10">
              <CardContent className="p-0">
                <div className="aspect-video bg-muted relative overflow-hidden">
                  <img src={course.image} alt={course.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                  <course.icon className="w-8 h-8 text-white absolute top-3 right-3" />
                  <h3 className="font-semibold text-lg text-white absolute bottom-3 left-3">{course.title}</h3>
                </div>
              </CardContent>
              <CardFooter className="p-3">
                <div className="w-full">
                  <div className="flex justify-between text-xs text-muted-foreground mb-1">
                    <span>Progress</span>
                    <span>{course.progress}%</span>
                  </div>
                  <Progress value={course.progress} />
                </div>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}