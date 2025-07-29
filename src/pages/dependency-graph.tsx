import { motion } from 'framer-motion';
import { ArrowLeft, GitBranch, GitFork, GitMerge, GitPullRequest } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export function DependencyGraph({
  onNavigate,
  projectData
}: {
  onNavigate: (page: string) => void;
  projectData: any;
}) {
  if (!projectData?.insights?.architecture) {
    onNavigate('form');
    return null;
  }

  const { components, relationships } = projectData.insights.architecture;

  // Group dependencies by type
  const dependencyTypes = {
    core: components.filter((c: any) => 
      relationships.some((r: any) => r.from === c.name && r.type === 'depends on')
    ),
    services: components.filter((c: any) => 
      relationships.some((r: any) => r.from === c.name && r.type === 'provides')
    ),
    data: components.filter((c: any) => 
      relationships.some((r: any) => r.from === c.name && r.type === 'stores')
    ),
    external: components.filter((c: any) => 
      relationships.some((r: any) => r.from === c.name && r.type === 'integrates')
    )
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="container py-10"
    >
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Dependency Graph</h1>
          <p className="text-muted-foreground">
            Component dependencies for {projectData.name}
          </p>
        </div>
        <Button
          variant="outline"
          onClick={() => onNavigate('dashboard')}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Dashboard
        </Button>
      </div>

      <div className="grid gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <GitBranch className="h-5 w-5" />
                Core Dependencies
              </CardTitle>
              <CardDescription>Essential system components and their dependencies</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {dependencyTypes.core.map((component: any, index: number) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="border-l-2 border-blue-500 pl-4"
                  >
                    <h3 className="font-semibold">{component.name}</h3>
                    <p className="text-sm text-muted-foreground mb-2">{component.description}</p>
                    <div className="space-y-2">
                      {relationships
                        .filter((r: any) => r.from === component.name)
                        .map((rel: any, relIndex: number) => (
                          <div
                            key={relIndex}
                            className="flex items-center gap-2 text-sm"
                          >
                            <GitPullRequest className="h-4 w-4" />
                            <span>Depends on: {rel.to}</span>
                          </div>
                        ))}
                    </div>
                  </motion.div>
                ))}
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
                  <GitFork className="h-5 w-5" />
                  Service Dependencies
                </CardTitle>
                <CardDescription>Service-level component relationships</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {dependencyTypes.services.map((component: any, index: number) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="border-l-2 border-green-500 pl-4"
                    >
                      <h3 className="font-semibold">{component.name}</h3>
                      <p className="text-sm text-muted-foreground">{component.description}</p>
                    </motion.div>
                  ))}
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
                  <GitMerge className="h-5 w-5" />
                  Data Dependencies
                </CardTitle>
                <CardDescription>Data flow and storage relationships</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {dependencyTypes.data.map((component: any, index: number) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="border-l-2 border-purple-500 pl-4"
                    >
                      <h3 className="font-semibold">{component.name}</h3>
                      <p className="text-sm text-muted-foreground">{component.description}</p>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>External Dependencies</CardTitle>
              <CardDescription>Third-party integrations and external services</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {dependencyTypes.external.map((component: any, index: number) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="border-l-2 border-orange-500 pl-4"
                  >
                    <h3 className="font-semibold">{component.name}</h3>
                    <p className="text-sm text-muted-foreground mb-2">{component.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {relationships
                        .filter((r: any) => r.from === component.name)
                        .map((rel: any, relIndex: number) => (
                          <span
                            key={relIndex}
                            className="px-2 py-1 bg-secondary text-secondary-foreground rounded-full text-xs"
                          >
                            {rel.to}
                          </span>
                        ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
}