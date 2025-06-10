import { motion } from "framer-motion";
import { ChevronRight, CheckCircle2, AlertCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

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
          <Button onClick={() => onNavigate("dashboard")}>
            Dashboard <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </div>

        <div className="grid gap-8">
          {phases.map((phase: any, index: number) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-2xl">
                        Phase {index + 1}: {phase.phase}
                      </CardTitle>
                      <CardDescription className="mt-2">
                        Duration: {phase.duration}
                      </CardDescription>
                    </div>
                    <Badge variant="outline" className="text-sm">
                      Not Started
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="font-semibold mb-2">Description</h3>
                    <p className="text-muted-foreground">{phase.description}</p>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">Objectives</h3>
                    <ul className="list-disc list-inside space-y-1">
                      {phase.objectives?.map((objective: string, i: number) => (
                        <li key={i} className="text-muted-foreground">{objective}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">Deliverables</h3>
                    <ul className="list-disc list-inside space-y-1">
                      {phase.deliverables?.map((deliverable: string, i: number) => (
                        <li key={i} className="text-muted-foreground">{deliverable}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">Tasks</h3>
                    <div className="space-y-4">
                      {phase.tasks?.map((task: any, i: number) => (
                        <Card key={i} className="bg-muted/50">
                          <CardHeader className="pb-2">
                            <CardTitle className="text-base flex items-center gap-2">
                              <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
                              {task.name}
                            </CardTitle>
                            <CardDescription>Duration: {task.duration}</CardDescription>
                          </CardHeader>
                          <CardContent className="space-y-2">
                            <p className="text-sm text-muted-foreground">{task.description}</p>
                            {task.dependencies?.length > 0 && (
                              <div>
                                <p className="text-sm font-medium">Dependencies:</p>
                                <ul className="list-disc list-inside text-sm text-muted-foreground">
                                  {task.dependencies.map((dep: string, j: number) => (
                                    <li key={j}>{dep}</li>
                                  ))}
                                </ul>
                              </div>
                            )}
                            {task.acceptance_criteria?.length > 0 && (
                              <div>
                                <p className="text-sm font-medium">Acceptance Criteria:</p>
                                <ul className="list-disc list-inside text-sm text-muted-foreground">
                                  {task.acceptance_criteria.map((criteria: string, j: number) => (
                                    <li key={j}>{criteria}</li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>

                  <Separator />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h3 className="font-semibold mb-2 flex items-center gap-2">
                        <AlertCircle className="h-4 w-4" />
                        Risks
                      </h3>
                      <ul className="list-disc list-inside space-y-1">
                        {phase.risks?.map((risk: string, i: number) => (
                          <li key={i} className="text-muted-foreground">{risk}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">Success Criteria</h3>
                      <ul className="list-disc list-inside space-y-1">
                        {phase.success_criteria?.map((criteria: string, i: number) => (
                          <li key={i} className="text-muted-foreground">{criteria}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {phase.next_steps?.length > 0 && (
                    <div>
                      <h3 className="font-semibold mb-2 flex items-center gap-2">
                        <ArrowRight className="h-4 w-4" />
                        Next Steps
                      </h3>
                      <ul className="list-disc list-inside space-y-1">
                        {phase.next_steps.map((step: string, i: number) => (
                          <li key={i} className="text-muted-foreground">{step}</li>
                        ))}
                      </ul>
                    </div>
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
