import { motion } from "framer-motion";
import { ChevronRight, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export function CostBreakdown({
  onNavigate,
  projectData,
}: {
  onNavigate: (page: string) => void;
  projectData: any;
}) {
  if (!projectData?.insights?.costBreakdown || !projectData?.budget) {
    onNavigate("form");
    return null;
  }

  const { development, infrastructure, maintenance, contingency } =
    projectData.insights.costBreakdown;
  const totalBudget = projectData.budget;

  const categories = [
    { name: "Development", data: development, color: "bg-blue-500" },
    { name: "Infrastructure", data: infrastructure, color: "bg-green-500" },
    { name: "Maintenance", data: maintenance, color: "bg-purple-500" },
    { name: "Contingency", data: contingency, color: "bg-orange-500" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex justify-center w-screen px-4 sm:px-6 md:px-8"
    >
      <div className="w-full max-w-7xl py-10">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold mb-2">
              Cost Breakdown
            </h1>
            <p className="text-muted-foreground">
              Detailed cost analysis for {projectData.name}
            </p>
          </div>
          <div className="w-full sm:w-auto">
            <Button
              onClick={() => onNavigate("dashboard")}
              className="w-full sm:w-auto"
            >
              Dashboard <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-6 w-6" />
                Total Estimated Cost
              </CardTitle>
              <CardDescription>Breakdown of project costs</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl sm:text-4xl font-bold mb-6">
                ${totalBudget.toLocaleString()}
              </div>
              <div className="space-y-6">
                {categories.map((category, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="flex justify-between mb-2">
                      <span className="font-medium">{category.name}</span>
                      <span className="font-semibold">
                        ${category.data.amount.toLocaleString()}
                      </span>
                    </div>
                    <Progress
                      value={(category.data.amount / totalBudget) * 100}
                      className={category.color}
                    />
                    <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                      {category.data.details.map(
                        (detail: string, i: number) => (
                          <li key={i}>• {detail}</li>
                        )
                      )}
                    </ul>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </motion.div>
  );
}
