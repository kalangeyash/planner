import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function TechStack({
  onNavigate,
  projectData,
}: {
  onNavigate: (page: string) => void;
  projectData: any;
}) {
  if (!projectData?.insights?.techStack) {
    onNavigate("form");
    return null;
  }

  const { frontend, backend, database, devops } = projectData.insights.techStack;

  const categories = [
    { name: "Frontend", items: frontend },
    { name: "Backend", items: backend },
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
            <Button variant="outline" onClick={() => onNavigate("timeline")}>
              Back to Timeline
            </Button>
            <Button onClick={() => onNavigate("dashboard")}>Dashboard</Button>
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
