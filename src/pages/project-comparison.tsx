import { motion } from "framer-motion";
import { ArrowLeft, BarChart3, Clock, DollarSign, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function ProjectComparison({
  onNavigate,
  projectData,
  savedProjects,
}: {
  onNavigate: (page: string) => void;
  projectData: any;
  savedProjects: any[];
}) {
  const allProjects = [...savedProjects, projectData].filter(Boolean);

  if (allProjects.length < 2) {
    return (
      <div className="flex items-center justify-center min-h-screen w-screen bg-background">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="container py-10"
        >
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4">No Projects to Compare</h1>
            <p className="text-muted-foreground mb-8">
              Save at least one more project to enable comparison
            </p>
            <Button onClick={() => onNavigate("dashboard")}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
          </div>
        </motion.div>
      </div>
    );
  }

  const metrics = [
    { icon: DollarSign, name: "Budget", key: "budget" },
    {
      icon: Clock,
      name: "Timeline",
      key: "insights.timeline.milestones.length",
    },
    { icon: Users, name: "Team Size", key: "insights.team.roles.length" },
    {
      icon: BarChart3,
      name: "Risk Count",
      key: "insights.risks.technical.length",
      calculate: (project: any) =>
        project.insights.risks.technical.length +
        project.insights.risks.business.length +
        project.insights.risks.operational.length,
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="container py-10"
    >
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Project Comparison</h1>
          <p className="text-muted-foreground">
            Compare metrics across different projects
          </p>
        </div>
        <Button variant="outline" onClick={() => onNavigate("dashboard")}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Dashboard
        </Button>
      </div>

      <div className="grid gap-6">
        {metrics.map((metric, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <metric.icon className="h-5 w-5" />
                  {metric.name} Comparison
                </CardTitle>
                <CardDescription>
                  Comparing {metric.name.toLowerCase()} across projects
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {allProjects.map((project, projectIndex) => {
                    const value = metric.calculate
                      ? metric.calculate(project)
                      : metric.key
                          .split(".")
                          .reduce((obj, key) => obj?.[key], project);

                    return (
                      <div
                        key={projectIndex}
                        className="flex items-center gap-4"
                      >
                        <div className="w-48 font-medium truncate">
                          {project.name}
                        </div>
                        <div className="flex-1 h-4 bg-secondary rounded-full overflow-hidden">
                          <div
                            className="h-full bg-primary transition-all"
                            style={{
                              width: `${
                                (value /
                                  Math.max(
                                    ...allProjects.map((p) =>
                                      metric.calculate
                                        ? metric.calculate(p)
                                        : metric.key
                                            .split(".")
                                            .reduce((obj, key) => obj?.[key], p)
                                    )
                                  )) *
                                100
                              }%`,
                            }}
                          />
                        </div>
                        <div className="w-24 text-right font-medium">
                          {metric.name === "Budget"
                            ? `$${value.toLocaleString()}`
                            : value}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
