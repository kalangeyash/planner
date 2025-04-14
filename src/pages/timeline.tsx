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

  const milestones = projectData.insights.timeline.milestones ?? [];

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
            <Button
              variant="outline"
              onClick={() => onNavigate("architecture")}
            >
              Back to Architecture
            </Button>
            <Button onClick={() => onNavigate("techstack")}>
              View Tech Stack
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
            <Button onClick={() => onNavigate("dashboard")}>Dashboard</Button>
          </div>
        </div>

        <div className="relative">
          {milestones.map((milestone: any, index: number) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="mb-8"
            >
              <Card>
                <CardHeader>
                  <CardTitle>{milestone.name}</CardTitle>
                  <CardDescription>{milestone.date}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <p>{milestone.description}</p>
                    <div className="text-sm text-muted-foreground">
                      <strong>Deliverables:</strong>
                      {Array.isArray(milestone.deliverables) &&
                      milestone.deliverables.length > 0 ? (
                        <ul className="list-disc list-inside mt-2">
                          {milestone.deliverables.map(
                            (item: string, i: number) => (
                              <li key={i}>{item}</li>
                            )
                          )}
                        </ul>
                      ) : (
                        <p className="mt-2 italic">No deliverables listed.</p>
                      )}
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
