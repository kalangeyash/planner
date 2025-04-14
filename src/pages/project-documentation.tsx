import { motion } from 'framer-motion';
import { ArrowLeft, Book, Code2, FileText, GitBranch, Server, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';

export function ProjectDocumentation({
  onNavigate,
  projectData
}: {
  onNavigate: (page: string) => void;
  projectData: any;
}) {
  if (!projectData?.insights) {
    onNavigate('form');
    return null;
  }

  const sections = [
    {
      id: 'overview',
      icon: FileText,
      title: 'Project Overview',
      content: (
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-2">Project Description</h3>
            <p className="text-muted-foreground">{projectData.description}</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Key Requirements</h3>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              {projectData.requirements.map((req: string, index: number) => (
                <li key={index}>{req}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Industry Context</h3>
            <p className="text-muted-foreground">{projectData.industry}</p>
          </div>
        </div>
      )
    },
    {
      id: 'architecture',
      icon: Server,
      title: 'Architecture',
      content: (
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-2">System Components</h3>
            <div className="space-y-4">
              {projectData.insights.architecture.components.map((component: any, index: number) => (
                <div key={index} className="border-l-2 border-primary pl-4">
                  <h4 className="font-medium">{component.name}</h4>
                  <p className="text-sm text-muted-foreground">{component.description}</p>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Component Relationships</h3>
            <div className="space-y-4">
              {projectData.insights.architecture.relationships.map((rel: any, index: number) => (
                <div key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <GitBranch className="h-4 w-4" />
                  <span>{rel.from}</span>
                  <span className="text-primary">→</span>
                  <span>{rel.to}</span>
                  <span className="text-muted-foreground">({rel.type})</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'technical',
      icon: Code2,
      title: 'Technical Stack',
      content: (
        <div className="space-y-6">
          {Object.entries(projectData.insights.techStack).map(([category, technologies]: [string, any]) => (
            <div key={category}>
              <h3 className="text-lg font-semibold mb-2 capitalize">{category}</h3>
              <div className="space-y-4">
                {technologies.map((tech: any, index: number) => (
                  <div key={index} className="border-l-2 border-primary pl-4">
                    <h4 className="font-medium">{tech.name}</h4>
                    <p className="text-sm text-muted-foreground">{tech.reason}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )
    },
    {
      id: 'team',
      icon: Users,
      title: 'Team Structure',
      content: (
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-2">Required Roles</h3>
            <div className="space-y-4">
              {projectData.insights.team.roles.map((role: any, index: number) => (
                <div key={index} className="border-l-2 border-primary pl-4">
                  <h4 className="font-medium">{role.title}</h4>
                  <p className="text-sm text-muted-foreground">{role.responsibilities}</p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {role.skills.map((skill: string, skillIndex: number) => (
                      <span
                        key={skillIndex}
                        className="px-2 py-1 bg-secondary text-secondary-foreground rounded-full text-xs"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Team Organization</h3>
            <div className="space-y-4">
              {projectData.insights.team.structure.teams.map((team: any, index: number) => (
                <div key={index} className="border-l-2 border-primary pl-4">
                  <h4 className="font-medium">{team.name}</h4>
                  <p className="text-sm text-muted-foreground">{team.description}</p>
                  <ul className="mt-2 list-disc list-inside text-sm text-muted-foreground">
                    {team.members.map((member: string, memberIndex: number) => (
                      <li key={memberIndex}>{member}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      )
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="container py-10"
    >
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Project Documentation</h1>
          <p className="text-muted-foreground">
            Comprehensive documentation for {projectData.name}
          </p>
        </div>
        <div className="flex gap-4">
          <Button
            variant="outline"
            onClick={() => onNavigate('dashboard')}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
          <Button
            onClick={() => {
              const content = document.getElementById('documentation-content');
              if (content) {
                const blob = new Blob([content.innerText], { type: 'text/plain' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `${projectData.name.toLowerCase().replace(/\s+/g, '-')}-documentation.md`;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                URL.revokeObjectURL(url);
              }
            }}
          >
            <Book className="h-4 w-4 mr-2" />
            Export Documentation
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Documentation Sections</CardTitle>
          <CardDescription>
            Detailed project documentation organized by sections
          </CardDescription>
        </CardHeader>
        <CardContent id="documentation-content">
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid grid-cols-4 w-full">
              {sections.map((section) => (
                <TabsTrigger
                  key={section.id}
                  value={section.id}
                  className="flex items-center gap-2"
                >
                  <section.icon className="h-4 w-4" />
                  {section.title}
                </TabsTrigger>
              ))}
            </TabsList>
            {sections.map((section) => (
              <TabsContent
                key={section.id}
                value={section.id}
                className="mt-6 space-y-6"
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {section.content}
                </motion.div>
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>
    </motion.div>
  );
}