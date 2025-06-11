import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChevronRight } from "lucide-react";

export function TechStack({
  onNavigate,
  projectData,
}: {
  onNavigate: (page: string) => void;
  projectData: any;
}) {
  if (!projectData?.insights?.devStack) {
    onNavigate("form");
    return null;
  }

  const { devStack, database, devops } = projectData.insights.devStack;

  const categories = [
    { name: "Development Stack", items: Array.isArray(devStack) ? devStack : [devStack] },
    { name: "Database", items: database },
    { name: "DevOps", items: devops },
  ];

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
            <h1 className="text-3xl font-bold mb-2">Recommended Tech Stack</h1>
            <p className="text-muted-foreground">
              Technology recommendations for {projectData.name}
            </p>
          </div>
          <div className="flex gap-4">
            {/* <Button variant="outline" onClick={() => onNavigate("timeline")}>
              Back to Timeline
            </Button> */}
            <Button onClick={() => onNavigate("dashboard")}>Dashboard <ChevronRight className="ml-2 h-4 w-4" /></Button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {categories.map((category, index) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>{category.name}</CardTitle>
                  <CardDescription>Recommended technologies</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-4">
                    {category.items.map((tech: string, techIndex: number) => (
                      <li
                        key={techIndex}
                        className="border-l-2 border-primary pl-4"
                      >
                        <h3 className="font-semibold">{tech}</h3>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
