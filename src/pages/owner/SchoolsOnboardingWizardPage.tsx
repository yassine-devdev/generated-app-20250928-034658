import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { FileUp, Building, User, ShieldCheck } from 'lucide-react';
const steps = [
  { id: 1, name: 'School Info', icon: Building },
  { id: 2, name: 'Admin Account', icon: User },
  { id: 3, name: 'Upload Documents', icon: FileUp },
  { id: 4, name: 'Confirmation', icon: ShieldCheck },
];
const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 1000 : -1000,
    opacity: 0,
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? 1000 : -1000,
    opacity: 0,
  }),
};
export function SchoolsOnboardingWizardPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [direction, setDirection] = useState(0);
  const progress = ((currentStep + 1) / steps.length) * 100;
  const nextStep = () => {
    setDirection(1);
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };
  const prevStep = () => {
    setDirection(-1);
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };
  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-4">
            <div><Label htmlFor="school-name">School Name</Label><Input id="school-name" placeholder="e.g., Aetheris Academy" /></div>
            <div><Label htmlFor="school-address">Address</Label><Input id="school-address" placeholder="123 Future Ave, Innovation City" /></div>
          </div>
        );
      case 1:
        return (
          <div className="space-y-4">
            <div><Label htmlFor="admin-name">Admin Full Name</Label><Input id="admin-name" placeholder="e.g., Alex Ryder" /></div>
            <div><Label htmlFor="admin-email">Admin Email</Label><Input id="admin-email" type="email" placeholder="alex.ryder@aetheris.edu" /></div>
          </div>
        );
      case 2:
        return (
          <div className="flex flex-col items-center justify-center p-8 border-2 border-dashed rounded-lg border-muted-foreground/50">
            <FileUp className="w-12 h-12 text-muted-foreground mb-4" />
            <p className="text-muted-foreground">Drag & drop documents here</p>
            <Button variant="outline" className="mt-4">Or browse files</Button>
          </div>
        );
      case 3:
        return (
          <div className="text-center">
            <ShieldCheck className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold">Ready to Onboard!</h3>
            <p className="text-muted-foreground mt-2">Review the information and submit to begin the onboarding process.</p>
          </div>
        );
      default:
        return null;
    }
  };
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
    >
      <h1 className="text-3xl font-display font-bold mb-8">New School Onboarding</h1>
      <Card className="w-full max-w-2xl mx-auto glass-pane">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-display">{steps[currentStep].name}</CardTitle>
          <Progress value={progress} className="mt-4" indicatorClassName="transition-all duration-500 ease-in-out" />
          <div className="flex justify-between mt-2">
            {steps.map((step, index) => (
              <div key={step.id} className="flex flex-col items-center flex-1">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${index <= currentStep ? 'bg-primary border-primary text-primary-foreground' : 'bg-muted border-border'}`}>
                  <step.icon className="w-4 h-4" />
                </div>
                <p className={`text-xs mt-1 text-center ${index <= currentStep ? 'text-foreground' : 'text-muted-foreground'}`}>{step.name}</p>
              </div>
            ))}
          </div>
        </CardHeader>
        <CardContent className="overflow-hidden relative min-h-[250px]">
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={currentStep}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ x: { type: 'spring', stiffness: 300, damping: 30 }, opacity: { duration: 0.2 } }}
              className="absolute w-full p-6 top-0 left-0"
            >
              {renderStepContent()}
            </motion.div>
          </AnimatePresence>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={prevStep} disabled={currentStep === 0}>Back</Button>
          {currentStep < steps.length - 1 ? (
            <Button onClick={nextStep}>Next</Button>
          ) : (
            <Button className="bg-green-600 hover:bg-green-700">Submit Onboarding</Button>
          )}
        </CardFooter>
      </Card>
    </motion.div>
  );
}