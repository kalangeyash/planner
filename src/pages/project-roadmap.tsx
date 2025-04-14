import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function ProjectRoadmap({
  onNavigate,
  projectData,
}: {
  onNavigate: (page: string) => void;
  projectData: any;
}) {
  if (!projectData?.insights?.roadmap) {
    onNavigate("form");
    return null;
  }

  const phases = projectData.insights.roadmap.phases ?? [];

  return (
    <div className="flex items-center justify-center min-h-screen w-screen bg-background">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="container py-10"
      >
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Project Roadmap</h1>
            <p className="text-muted-foreground">
              Strategic phases and milestones for {projectData.name}
            </p>
          </div>
          <div className="flex gap-4">
            <Button variant="outline" onClick={() => onNavigate("form")}>
              Back to Form
            </Button>
            <Button onClick={() => onNavigate("architecture")}>
              View Architecture
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
            <Button onClick={() => onNavigate("dashboard")}>Dashboard</Button>
          </div>
        </div>

        <div className="grid gap-6">
          {phases.map((phase: any, index: number) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>
                    Phase {index + 1}: {phase.phase}
                  </CardTitle>
                  <CardDescription>{phase.duration}</CardDescription>
                </CardHeader>
                <CardContent>
                  {Array.isArray(phase.activities) &&
                  phase.activities.length > 0 ? (
                    <ul className="list-disc list-inside space-y-2">
                      {phase.activities.map(
                        (task: string, taskIndex: number) => (
                          <li key={taskIndex}>{task}</li>
                        )
                      )}
                    </ul>
                  ) : (
                    <p className="text-sm text-muted-foreground">
                      No activities listed for this phase.
                    </p>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
