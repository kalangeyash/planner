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

export function Timeline({
  onNavigate,
  projectData,
}: {
  onNavigate: (page: string) => void;
  projectData: any;
}) {
  if (!projectData?.insights?.timeline) {
    onNavigate("form");
    return null;
  }

  const { phases } = projectData.insights.timeline;

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
            <h1 className="text-3xl font-bold mb-2">Project Timeline</h1>
            <p className="text-muted-foreground">
              Development timeline for {projectData.name}
            </p>
          </div>
          <div className="flex gap-4">
            <Button onClick={() => onNavigate("dashboard")}>Dashboard <ChevronRight className="ml-2 h-4 w-4" /></Button>
          </div>
        </div>

        <div className="space-y-8">
          {phases.map((phase: any, phaseIndex: number) => (
            <motion.div
              key={phaseIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: phaseIndex * 0.1 }}
            >
              <Card>
                <CardHeader>
                  <div>
                    <CardTitle>{phase.name}</CardTitle>
                    <CardDescription>{phase.duration}</CardDescription>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <p className="text-muted-foreground">{phase.description}</p>

                    {/* Milestones */}
                    <div className="space-y-4">
                      <h3 className="font-semibold">Milestones</h3>
                      {phase.milestones.map((milestone: any, milestoneIndex: number) => (
                        <div
                          key={milestoneIndex}
                          className="border-l-2 border-primary pl-4 py-2"
                        >
                          <div>
                            <h4 className="font-medium">{milestone.name}</h4>
                            <p className="mt-1 text-sm">{milestone.description}</p>
                            {milestone.dependencies.length > 0 && (
                              <div className="mt-2">
                                <p className="text-sm font-medium">Dependencies:</p>
                                <ul className="list-disc list-inside text-sm text-muted-foreground">
                                  {milestone.dependencies.map((dep: string, depIndex: number) => (
                                    <li key={depIndex}>{dep}</li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Tasks */}
                    <div className="space-y-4">
                      <h3 className="font-semibold">Tasks</h3>
                      {phase.tasks.map((task: any, taskIndex: number) => (
                        <div
                          key={taskIndex}
                          className="border-l-2 border-primary pl-4 py-2"
                        >
                          <div>
                            <h4 className="font-medium">{task.name}</h4>
                            <p className="text-sm text-muted-foreground">{task.duration}</p>
                            <p className="mt-1 text-sm">{task.description}</p>
                            {task.dependencies.length > 0 && (
                              <div className="mt-2">
                                <p className="text-sm font-medium">Dependencies:</p>
                                <ul className="list-disc list-inside text-sm text-muted-foreground">
                                  {task.dependencies.map((dep: string, depIndex: number) => (
                                    <li key={depIndex}>{dep}</li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
