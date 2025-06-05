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
import { useEffect, useRef } from "react";
import mermaid from "mermaid";

export function SystemArchitecture({
  onNavigate,
  projectData,
}: {
  onNavigate: (page: string) => void;
  projectData: any;
}) {
  const mermaidRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (mermaidRef.current) {
      mermaid.initialize({
        startOnLoad: true,
        theme: "default",
        securityLevel: "loose",
      });
      mermaid.contentLoaded();
    }
  }, []);

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
            {/* <Button variant="outline" onClick={() => onNavigate("roadmap")}>
              Back to Roadmap
            </Button>
            <Button onClick={() => onNavigate("timeline")}>
              View Timeline
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button> */}
            <Button onClick={() => onNavigate("dashboard")}>Dashboard <ChevronRight className="ml-2 h-4 w-4" /></Button>
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
                <div className="mermaid" ref={mermaidRef}>
                  {`
                    graph TD
                      subgraph Frontend
                        A[React/Vite App] --> B[API Gateway]
                      end

                      subgraph Backend
                        B --> C[Authentication Service]
                        B --> D[User Service]
                        B --> E[Content Service]
                        B --> F[Analytics Service]
                      end

                      subgraph Database
                        G[(PostgreSQL)]
                      end

                      C --> G
                      D --> G
                      E --> G
                      F --> G

                      subgraph External Services
                        H[Email Service]
                        I[Storage Service]
                      end

                      C --> H
                      E --> I

                      style A fill:#f9f,stroke:#333,stroke-width:2px
                      style B fill:#bbf,stroke:#333,stroke-width:2px
                      style C fill:#bfb,stroke:#333,stroke-width:2px
                      style D fill:#bfb,stroke:#333,stroke-width:2px
                      style E fill:#bfb,stroke:#333,stroke-width:2px
                      style F fill:#bfb,stroke:#333,stroke-width:2px
                      style G fill:#fbb,stroke:#333,stroke-width:2px
                      style H fill:#fbf,stroke:#333,stroke-width:2px
                      style I fill:#fbf,stroke:#333,stroke-width:2px
                  `}
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
