import { motion } from "framer-motion";
import {
  Activity,
  BarChart2,
  Book,
  CheckCircle,
  Clock,
  Code2,
  Download,
  FileText,
  GitBranch,
  LineChart,
  Save,
  Server,
  Target,
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
import { toast } from "sonner";

export function ProjectDashboard({
  onNavigate,
  projectData,
  savedProjects,
  setSavedProjects,
}: {
  onNavigate: (page: string) => void;
  projectData: any;
  savedProjects: any[];
  setSavedProjects: (projects: any[]) => void;
}) {
  if (!projectData?.insights?.successMetrics) {
    onNavigate("form");
    return null;
  }

  // const { kpis, milestones, quality } = projectData.insights.successMetrics;

  const handleSaveProject = () => {
    const newSavedProjects = [
      ...savedProjects,
      { ...projectData, savedAt: new Date() },
    ];
    setSavedProjects(newSavedProjects);
    toast.success("Project saved for comparison");
  };

  const handleExportProject = () => {
    const exportData = {
      project: projectData,
      exportedAt: new Date(),
      version: "1.0",
    };

    const blob = new Blob([JSON.stringify(exportData, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${projectData.name
      .toLowerCase()
      .replace(/\s+/g, "-")}-plan.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast.success("Project exported successfully");
  };

  // Calculate project metrics
  const calculateProgress = () => {
    const totalMilestones = projectData.insights.timeline.milestones.length;
    const completedMilestones = Math.floor(Math.random() * totalMilestones);
    return (completedMilestones / totalMilestones) * 100;
  };

  const calculateBudgetUsage = () => {
    const totalBudget = projectData.budget;
    const spentBudget = totalBudget * (Math.random() * 0.8 + 0.1);
    return (spentBudget / totalBudget) * 100;
  };

  const calculateRiskLevel = () => {
    const totalRisks =
      projectData.insights.risks.technical.length +
      projectData.insights.risks.business.length +
      projectData.insights.risks.operational.length;
    const highRisks =
      projectData.insights.risks.technical.filter(
        (r: any) => r.severity === "High"
      ).length +
      projectData.insights.risks.business.filter(
        (r: any) => r.severity === "High"
      ).length +
      projectData.insights.risks.operational.filter(
        (r: any) => r.severity === "High"
      ).length;
    return (highRisks / totalRisks) * 100;
  };

  const metrics = [
    {
      title: "Project Progress",
      value: calculateProgress(),
      icon: Clock,
      color: "bg-blue-500",
    },
    {
      title: "Budget Usage",
      value: calculateBudgetUsage(),
      icon: BarChart2,
      color: "bg-green-500",
    },
    {
      title: "Risk Level",
      value: calculateRiskLevel(),
      icon: Activity,
      color: "bg-red-500",
    },
    {
      title: "Team Utilization",
      value: 85,
      icon: Users,
      color: "bg-purple-500",
    },
  ];

  const navigationCards = [
    {
      title: "Project Roadmap",
      description: "Strategic phases and milestones",
      icon: Target,
      route: "roadmap",
    },
    {
      title: "System Architecture",
      description: "Technical architecture design",
      icon: Server,
      route: "architecture",
    },
    {
      title: "Timeline",
      description: "Project timeline and deadlines",
      icon: Clock,
      route: "timeline",
    },
    {
      title: "Tech Stack",
      description: "Technology recommendations",
      icon: Code2,
      route: "techstack",
    },
    {
      title: "Cost Breakdown",
      description: "Budget and cost analysis",
      icon: BarChart2,
      route: "costs",
    },
    {
      title: "Team Planning",
      description: "Team structure and roles",
      icon: Users,
      route: "team",
    },
    {
      title: "Risk Assessment",
      description: "Risk analysis and mitigation",
      icon: Activity,
      route: "risks",
    },
    {
      title: "Resource Allocation",
      description: "Resource distribution",
      icon: GitBranch,
      route: "resources",
    },
    {
      title: "Documentation",
      description: "Project documentation",
      icon: FileText,
      route: "documentation",
    },
    {
      title: "Project Health",
      description: "Health monitoring",
      icon: CheckCircle,
      route: "health",
    },
    {
      title: "Analytics",
      description: "Project analytics and insights",
      icon: LineChart,
      route: "analytics",
    },
    {
      title: "Project Comparison",
      description: "Compare with other projects",
      icon: BarChart2,
      route: "comparison",
    },
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
            <h1 className="text-3xl font-bold mb-2">Project Dashboard</h1>
            <p className="text-muted-foreground">
              Overview and management for {projectData.name}
            </p>
          </div>
          <div className="flex gap-4">
            <Button variant="outline" onClick={handleSaveProject}>
              <Save className="h-4 w-4 mr-2" />
              Save Project
            </Button>
            <Button variant="outline" onClick={handleExportProject}>
              <Download className="h-4 w-4 mr-2" />
              Export Project
            </Button>
            <Button onClick={() => onNavigate("form")}>New Project</Button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          {metrics.map((metric, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <metric.icon className="h-5 w-5" />
                    {metric.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <p className="text-2xl font-bold">
                      {Math.round(metric.value)}%
                    </p>
                    <Progress value={metric.value} className={metric.color} />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Project Overview */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Book className="h-5 w-5" />
              Project Overview
            </CardTitle>
            <CardDescription>
              Key project information and details
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <h3 className="font-semibold mb-2">Description</h3>
                <p className="text-muted-foreground">
                  {projectData.description}
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Industry</h3>
                <p className="text-muted-foreground">{projectData.industry}</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Budget</h3>
                <p className="text-2xl font-bold">
                  ${projectData.budget.toLocaleString()}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Navigation Grid */}
        <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
          {navigationCards.map((card, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card
                className="cursor-pointer hover:bg-muted/50 transition-colors"
                onClick={() => onNavigate(card.route)}
              >
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <card.icon className="h-5 w-5" />
                    {card.title}
                  </CardTitle>
                  <CardDescription>{card.description}</CardDescription>
                </CardHeader>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
