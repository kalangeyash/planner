import { motion } from "framer-motion";
import { useEffect } from "react";
import {
  Activity,
  BarChart2,
  Clock,
  Code2,
  Copy,
  Download,
  Server,
  Target,
  Loader2,
  Home,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
// import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import { ExportPDFButton } from "@/components/ExportPDFButton";
import { useProject } from "@/context/ProjectContext";

export function ProjectDashboard({
  onNavigate,
}: {
  onNavigate: (page: string) => void;
}) {
  const { projectData, isLoading } = useProject();

  useEffect(() => {
    if (!isLoading && (!projectData || !projectData.insights)) {
      console.log("Navigating to form because:", {
        isLoading,
        hasProjectData: !!projectData,
        hasInsights: !!projectData?.insights,
      });
      onNavigate("form");
    }
  }, [projectData, isLoading, onNavigate]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen w-screen bg-background">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!projectData || !projectData.insights) {
    console.log("No valid project data:", { projectData });
    return null;
  }

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
    if (projectData?.projectId) {
      navigator.clipboard.writeText(projectData.projectId);
      toast.success("Project ID copied to clipboard");
    } else {
      toast.error("No project ID available");
    }
  };

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
      title: "Risk Assessment",
      description: "Risk analysis and mitigation",
      icon: Activity,
      route: "risks",
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
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">{projectData.name}</h1>
            <p className="text-muted-foreground mt-2">
              {projectData.description}
            </p>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onNavigate("/landing")}
              className="flex items-center gap-2"
            >
              <Home className="h-4 w-4" />
              Back to Home
            </Button>
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
              onClick={handleExportProject}
              className="flex items-center gap-2"
            >
              <Download className="h-4 w-4" />
              Export JSON
            </Button>
            <ExportPDFButton projectData={projectData} />
          </div>
        </div>

        {/* Navigation Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {navigationCards.map((card, index) => (
            <Card
              key={index}
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
          ))}
        </div>
      </motion.div>
    </div>
  );
}
