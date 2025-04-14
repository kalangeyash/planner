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

export function SystemArchitecture({
  onNavigate,
  projectData,
}: {
  onNavigate: (page: string) => void;
  projectData: any;
}) {
  if (!projectData?.insights?.architecture) {
    onNavigate("form");
    return null;
  }

  const { components, relationships } = projectData.insights.architecture;

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
            <h1 className="text-3xl font-bold mb-2">System Architecture</h1>
            <p className="text-muted-foreground">
              Technical architecture for {projectData.name}
            </p>
          </div>
          <div className="flex gap-4">
            <Button variant="outline" onClick={() => onNavigate("roadmap")}>
              Back to Roadmap
            </Button>
            <Button onClick={() => onNavigate("timeline")}>
              View Timeline
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
            <Button onClick={() => onNavigate("dashboard")}>Dashboard</Button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Components</CardTitle>
                <CardDescription>
                  Key system components and services
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  {components.map((component: any, index: number) => (
                    <li key={index} className="border-l-2 border-primary pl-4">
                      <h3 className="font-semibold">{component.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {component.description}
                      </p>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Relationships</CardTitle>
                <CardDescription>How components interact</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  {relationships.map((rel: any, index: number) => (
                    <li key={index} className="border-l-2 border-primary pl-4">
                      <h3 className="font-semibold">
                        {rel.from} → {rel.to}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {rel.type}
                      </p>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
