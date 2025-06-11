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
import { useEffect, useRef, useState } from "react";
import mermaid from "mermaid";

export function SystemArchitecture({
  onNavigate,
  projectData,
}: {
  onNavigate: (page: string) => void;
  projectData: any;
}) {
  const mermaidRef = useRef<HTMLDivElement>(null);
  const [diagramError, setDiagramError] = useState<string | null>(null);

  useEffect(() => {
    mermaid.initialize({
      startOnLoad: true,
      theme: "default",
      securityLevel: "loose",
      flowchart: {
        curve: 'basis',
        padding: 20,
      },
      sequence: {
        diagramMarginX: 50,
        diagramMarginY: 10,
        actorMargin: 50,
        width: 150,
        height: 65,
        boxMargin: 10,
        boxTextMargin: 5,
        noteMargin: 10,
        messageMargin: 35,
      },
    });
  }, []);

  useEffect(() => {
    const renderDiagram = async () => {
      if (!mermaidRef.current || !projectData?.insights?.architecture?.mermaid) {
        return;
      }

      try {
        // Clear previous content
        mermaidRef.current.innerHTML = '';
        
        // Generate unique ID for this diagram
        const diagramId = `architecture-diagram-${Date.now()}`;
        
        // Render the diagram
        const { svg } = await mermaid.render(diagramId, projectData.insights.architecture.mermaid);
        
        if (mermaidRef.current) {
          mermaidRef.current.innerHTML = svg;
          setDiagramError(null);
        }
      } catch (error) {
        console.error('Mermaid rendering error:', error);
        setDiagramError(error instanceof Error ? error.message : 'Failed to render architecture diagram');
      }
    };

    renderDiagram();
  }, [projectData?.insights?.architecture?.mermaid]);

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
            <Button onClick={() => onNavigate("dashboard")}>
              Dashboard <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="col-span-2"
          >
            <Card>
              <CardHeader>
                <CardTitle>Architecture Diagram</CardTitle>
                <CardDescription>
                  Visual representation of the system architecture
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="relative border-2 border-border rounded-lg p-4 bg-card">
                  {diagramError ? (
                    <div className="text-destructive text-center p-4">
                      {diagramError}
                    </div>
                  ) : (
                    <div 
                      ref={mermaidRef} 
                      className="mermaid overflow-auto max-h-[600px] w-full"
                      style={{ minHeight: '400px' }}
                    />
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>

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
                  {components?.map((component: string, index: number) => (
                    <li key={index} className="border-l-2 border-primary pl-4">
                      <h3 className="font-semibold">{component}</h3>
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
                  {relationships?.map((rel: string, index: number) => (
                    <li key={index} className="border-l-2 border-primary pl-4">
                      <h3 className="font-semibold">{rel}</h3>
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
