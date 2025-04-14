import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ModeToggle } from '@/components/mode-toggle';
import { Brain, Code2, Rocket, Timer } from 'lucide-react';

export function LandingPage({ onNavigate }: { onNavigate: (page: string) => void }) {
  return (
    <div className=" flex justify-center align-middle min-h-screen w-screen bg-background">
      <nav className="fixed w-full top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2"
          >
            <Brain className="h-6 w-6" />
            <span className="font-bold">AI Software Planner</span>
          </motion.div>
          <ModeToggle />
        </div>
      </nav>

      <main className="container pt-24 pb-8 min-h-screen">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center text-center gap-6 pb-8"
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight">
            Transform Your Software Ideas
            <br />
            Into Reality
          </h1>
          <p className="text-lg text-muted-foreground max-w-[700px]">
            Let AI guide you through planning, architecture, and implementation.
            Get professional insights for your next software project.
          </p>
          <Button
            size="lg"
            onClick={() => onNavigate('form')}
            className="mt-4"
          >
            Start Planning
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-16"
        >
          {[
            {
              icon: Brain,
              title: "AI-Powered Insights",
              description: "Get intelligent recommendations based on your project requirements"
            },
            {
              icon: Code2,
              title: "Tech Stack Analysis",
              description: "Discover the perfect technology combination for your needs"
            },
            {
              icon: Timer,
              title: "Timeline Planning",
              description: "Detailed project timelines with realistic milestones"
            },
            {
              icon: Rocket,
              title: "Architecture Design",
              description: "Professional system architecture recommendations"
            }
          ].map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.1 }}
              className="group relative overflow-hidden rounded-lg border bg-background p-6 hover:shadow-lg transition-shadow"
            >
              <feature.icon className="h-12 w-12 mb-4 transition-transform group-hover:scale-110" />
              <h3 className="font-semibold mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </main>
    </div>
  );
}