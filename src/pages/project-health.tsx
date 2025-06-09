import { motion } from "framer-motion";
import {
  Activity,
  AlertTriangle,
  CheckCircle,
  ChevronRight,
  Clock,
  DollarSign,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export function ProjectHealth({
  onNavigate,
  projectData,
}: {
  onNavigate: (page: string) => void;
  projectData: any;
}) {
  if (!projectData?.insights) {
    onNavigate("form");
    return null;
  }

  const calculateProgress = () => {
    const totalMilestones = projectData.insights.timeline.milestones.length;
    const completedMilestones = Math.floor(Math.random() * totalMilestones); // Simulated progress
    return (completedMilestones / totalMilestones) * 100;
  };

  const calculateBudgetHealth = () => {
    const totalBudget = projectData.budget;
    const spentBudget = totalBudget * (Math.random() * 0.8 + 0.1); // Simulated spent budget (10-90%)
    return {
      spent: spentBudget,
      remaining: totalBudget - spentBudget,
      percentage: (spentBudget / totalBudget) * 100,
    };
  };

  const healthMetrics = {
    progress: calculateProgress(),
    budget: calculateBudgetHealth(),
    risks: {
      high:
        projectData.insights.risks.technical.filter(
          (r: any) => r.severity === "High"
        ).length +
        projectData.insights.risks.business.filter(
          (r: any) => r.severity === "High"
        ).length +
        projectData.insights.risks.operational.filter(
          (r: any) => r.severity === "High"
        ).length,
      medium:
        projectData.insights.risks.technical.filter(
          (r: any) => r.severity === "Medium"
        ).length +
        projectData.insights.risks.business.filter(
          (r: any) => r.severity === "Medium"
        ).length +
        projectData.insights.risks.operational.filter(
          (r: any) => r.severity === "Medium"
        ).length,
      low:
        projectData.insights.risks.technical.filter(
          (r: any) => r.severity === "Low"
        ).length +
        projectData.insights.risks.business.filter(
          (r: any) => r.severity === "Low"
        ).length +
        projectData.insights.risks.operational.filter(
          (r: any) => r.severity === "Low"
        ).length,
    },
    team: {
      total: projectData.insights.team.roles.length,
      active: Math.floor(projectData.insights.team.roles.length * 0.8), // Simulated active team members
    },
  };

  const getHealthStatus = () => {
    const budgetHealth = healthMetrics.budget.percentage <= 90;
    const progressHealth = healthMetrics.progress >= 30;
    const riskHealth = healthMetrics.risks.high <= 2;
    const teamHealth =
      healthMetrics.team.active >= healthMetrics.team.total * 0.7;

    if (budgetHealth && progressHealth && riskHealth && teamHealth) {
      return { status: "Healthy", color: "text-green-500", icon: CheckCircle };
    } else if (!budgetHealth || healthMetrics.risks.high > 3) {
      return { status: "At Risk", color: "text-red-500", icon: AlertTriangle };
    } else {
      return {
        status: "Needs Attention",
        color: "text-yellow-500",
        icon: Activity,
      };
    }
  };

  const healthStatus = getHealthStatus();

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
            <h1 className="text-3xl font-bold mb-2">Project Health</h1>
            <p className="text-muted-foreground">
              Health monitoring for {projectData.name}
            </p>
          </div>

          <Button onClick={() => onNavigate("dashboard")}>Dashboard <ChevronRight className="ml-2 h-4 w-4" /></Button>

        </div>

        <div className="grid gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <healthStatus.icon
                    className={`h-5 w-5 ${healthStatus.color}`}
                  />
                  Overall Health Status
                </CardTitle>
                <CardDescription>
                  Current project health indicators
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-4 gap-6">
                  <div className="space-y-2">
                    <h3 className="font-semibold">Status</h3>
                    <p className={`text-2xl font-bold ${healthStatus.color}`}>
                      {healthStatus.status}
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-semibold">Progress</h3>
                    <p className="text-2xl font-bold">
                      {Math.round(healthMetrics.progress)}%
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-semibold">Budget Used</h3>
                    <p className="text-2xl font-bold">
                      {Math.round(healthMetrics.budget.percentage)}%
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-semibold">High Risks</h3>
                    <p className="text-2xl font-bold">
                      {healthMetrics.risks.high}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5" />
                    Progress Tracking
                  </CardTitle>
                  <CardDescription>Project completion status</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="font-medium">Overall Progress</span>
                        <span>{Math.round(healthMetrics.progress)}%</span>
                      </div>
                      <Progress
                        value={healthMetrics.progress}
                        className="bg-blue-500"
                      />
                    </div>
                    <div className="space-y-4">
                      {projectData.insights.timeline.milestones.map(
                        (milestone: any, index: number) => (
                          <div
                            key={index}
                            className="border-l-2 border-primary pl-4"
                          >
                            <h4 className="font-medium">{milestone.name}</h4>
                            <p className="text-sm text-muted-foreground">
                              {milestone.date}
                            </p>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <DollarSign className="h-5 w-5" />
                    Budget Health
                  </CardTitle>
                  <CardDescription>
                    Budget utilization and forecasting
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="font-medium">Budget Utilized</span>
                        <span>
                          {Math.round(healthMetrics.budget.percentage)}%
                        </span>
                      </div>
                      <Progress
                        value={healthMetrics.budget.percentage}
                        className="bg-green-500"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <h4 className="font-medium">Spent</h4>
                        <p className="text-2xl font-bold">
                          $
                          {Math.round(
                            healthMetrics.budget.spent
                          ).toLocaleString()}
                        </p>
                      </div>
                      <div className="space-y-2">
                        <h4 className="font-medium">Remaining</h4>
                        <p className="text-2xl font-bold">
                          $
                          {Math.round(
                            healthMetrics.budget.remaining
                          ).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5" />
                    Risk Distribution
                  </CardTitle>
                  <CardDescription>
                    Current risk levels and categories
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between mb-2">
                          <span className="font-medium">High Risk Items</span>
                          <span>{healthMetrics.risks.high}</span>
                        </div>
                        <Progress
                          value={
                            (healthMetrics.risks.high /
                              (healthMetrics.risks.high +
                                healthMetrics.risks.medium +
                                healthMetrics.risks.low)) *
                            100
                          }
                          className="bg-red-500"
                        />
                      </div>
                      <div>
                        <div className="flex justify-between mb-2">
                          <span className="font-medium">Medium Risk Items</span>
                          <span>{healthMetrics.risks.medium}</span>
                        </div>
                        <Progress
                          value={
                            (healthMetrics.risks.medium /
                              (healthMetrics.risks.high +
                                healthMetrics.risks.medium +
                                healthMetrics.risks.low)) *
                            100
                          }
                          className="bg-yellow-500"
                        />
                      </div>
                      <div>
                        <div className="flex justify-between mb-2">
                          <span className="font-medium">Low Risk Items</span>
                          <span>{healthMetrics.risks.low}</span>
                        </div>
                        <Progress
                          value={
                            (healthMetrics.risks.low /
                              (healthMetrics.risks.high +
                                healthMetrics.risks.medium +
                                healthMetrics.risks.low)) *
                            100
                          }
                          className="bg-green-500"
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Team Health
                  </CardTitle>
                  <CardDescription>
                    Team composition and allocation
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="font-medium">Team Utilization</span>
                        <span>
                          {Math.round(
                            (healthMetrics.team.active /
                              healthMetrics.team.total) *
                              100
                          )}
                          %
                        </span>
                      </div>
                      <Progress
                        value={
                          (healthMetrics.team.active /
                            healthMetrics.team.total) *
                          100
                        }
                        className="bg-purple-500"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <h4 className="font-medium">Active Members</h4>
                        <p className="text-2xl font-bold">
                          {healthMetrics.team.active}
                        </p>
                      </div>
                      <div className="space-y-2">
                        <h4 className="font-medium">Total Capacity</h4>
                        <p className="text-2xl font-bold">
                          {healthMetrics.team.total}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
