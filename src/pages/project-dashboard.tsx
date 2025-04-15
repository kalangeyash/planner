import { motion } from "framer-motion";
import { useEffect } from "react";
import {
  Activity,
  BarChart2,
  Book,
  CheckCircle,
  Clock,
  Code2,
  Copy,
  Download,
  FileText,
  GitBranch,
  LineChart,
  Save,
  Server,
  Target,
  Users,
  Loader2,
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
import { useProject } from "@/context/ProjectContext";

export function ProjectDashboard({
  onNavigate,
}: {
  onNavigate: (page: string) => void;
}) {
  const { projectData, savedProjects, setSavedProjects, isLoading } = useProject();

  useEffect(() => {
    if (!projectData?.insights?.successMetrics) {
      onNavigate("form");
    }
  }, [projectData, onNavigate]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!projectData?.insights?.successMetrics) {
    return null;
  }

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

  const handleCopyProjectId = () => {
    if (projectData?.id) {
      navigator.clipboard.writeText(projectData.id);
      toast.success("Project ID copied to clipboard");
    }
  };

  // Calculate project metrics
  const calculateProgress = () => {
    if (!projectData?.insights?.timeline?.milestones) return 0;
    const totalMilestones = projectData.insights.timeline.milestones.length;
    const completedMilestones = Math.floor(Math.random() * totalMilestones);
    return (completedMilestones / totalMilestones) * 100;
  };

  const calculateBudgetUsage = () => {
    if (!projectData?.budget) return 0;
    const totalBudget = projectData.budget;
    const spentBudget = totalBudget * (Math.random() * 0.8 + 0.1);
    return (spentBudget / totalBudget) * 100;
  };

  const calculateRiskLevel = () => {
    if (!projectData?.insights?.risks) return 0;
    const totalRisks =
      (projectData.insights.risks.technical?.length || 0) +
      (projectData.insights.risks.business?.length || 0) +
      (projectData.insights.risks.operational?.length || 0);
    if (totalRisks === 0) return 0;
    
    const highRisks =
      (projectData.insights.risks.technical?.filter(
        (r: any) => r.severity === "High"
      ).length || 0) +
      (projectData.insights.risks.business?.filter(
        (r: any) => r.severity === "High"
      ).length || 0) +
      (projectData.insights.risks.operational?.filter(
        (r: any) => r.severity === "High"
      ).length || 0);
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
      description: "Project health metrics",
      icon: CheckCircle,
      route: "health",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">{projectData.name}</h1>
          <p className="text-muted-foreground mt-2">{projectData.description}</p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleCopyProjectId}
            className="flex items-center gap-2"
          >
            <Copy className="h-4 w-4" />
            Copy Project ID
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleSaveProject}
            className="flex items-center gap-2"
          >
            <Save className="h-4 w-4" />
            Save for Comparison
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleExportProject}
            className="flex items-center gap-2"
          >
            <Download className="h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {metrics.map((metric, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {metric.title}
                </CardTitle>
                <metric.icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{metric.value.toFixed(1)}%</div>
                <Progress value={metric.value} className="mt-2" />
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {navigationCards.map((card, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Card
              className="cursor-pointer hover:bg-accent transition-colors"
              onClick={() => onNavigate(card.route)}
            >
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <card.icon className="h-5 w-5" />
                  {card.title}
                </CardTitle>
                <CardDescription>{card.description}</CardDescription>
              </CardHeader>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
