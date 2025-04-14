import { motion } from 'framer-motion';
import { ChevronRight, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useEffect } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

export function TeamPlanning({
  onNavigate,
  projectData
}: {
  onNavigate: (page: string) => void;
  projectData: any;
}) {
  useEffect(() => {
    if (!projectData?.insights?.team) {
      onNavigate('risks');
    }
  }, [projectData, onNavigate]);

  // Show loading state if no team data
  if (!projectData?.insights?.team) {
    return (
      <div className="container py-10">
        <div className="flex items-center justify-between mb-8">
          <div>
            <Skeleton className="h-8 w-[250px] mb-2" />
            <Skeleton className="h-4 w-[300px]" />
          </div>
          <div className="flex gap-4">
            <Skeleton className="h-10 w-[120px]" />
            <Skeleton className="h-10 w-[120px]" />
            <Skeleton className="h-10 w-[120px]" />
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <Skeleton className="h-[400px]" />
          <Skeleton className="h-[400px]" />
        </div>
      </div>
    );
  }

  const { roles, structure } = projectData.insights.team;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="container py-10"
    >
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Team Planning</h1>
          <p className="text-muted-foreground">
            Team structure and roles for {projectData.name}
          </p>
        </div>
        <div className="flex gap-4">
          <Button
            variant="outline"
            onClick={() => onNavigate('costs')}
          >
            Back to Costs
          </Button>
          <Button
            onClick={() => onNavigate('risks')}
          >
            View Risks
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
          <Button
            onClick={() => onNavigate('dashboard')}
          >
            Dashboard
          </Button>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Required Roles
              </CardTitle>
              <CardDescription>Key team members needed</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                {roles?.map((role: any, index: number) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="border-l-2 border-primary pl-4"
                  >
                    <h3 className="font-semibold">{role.title}</h3>
                    <p className="text-sm text-muted-foreground">{role.responsibilities}</p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {role.skills?.map((skill: string, i: number) => (
                        <span
                          key={i}
                          className="px-2 py-1 bg-secondary text-secondary-foreground rounded-full text-xs"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </motion.li>
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
              <CardTitle>Team Structure</CardTitle>
              <CardDescription>Organization and reporting lines</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {structure?.teams?.map((team: any, index: number) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="border-l-2 border-primary pl-4"
                  >
                    <h3 className="font-semibold">{team.name}</h3>
                    <p className="text-sm text-muted-foreground mb-2">{team.description}</p>
                    <div className="space-y-2">
                      <strong className="text-sm">Members:</strong>
                      <ul className="list-disc list-inside text-sm text-muted-foreground">
                        {team.members?.map((member: string, i: number) => (
                          <li key={i}>{member}</li>
                        ))}
                      </ul>
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