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
      onNavigate('form');
    }
  }, [projectData, onNavigate]);

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
                {roles?.map((role: string, index: number) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="border-l-2 border-primary pl-4"
                  >
                    <h3 className="font-semibold">{role}</h3>
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
                <div className="border-l-2 border-primary pl-4">
                  <h3 className="font-semibold mb-2">Teams</h3>
                  <ul className="list-disc list-inside text-sm text-muted-foreground">
                    {structure?.teams?.map((team: string, i: number) => (
                      <li key={i}>{team}</li>
                    ))}
                  </ul>
                </div>
                <div className="border-l-2 border-primary pl-4">
                  <h3 className="font-semibold mb-2">Reporting Structure</h3>
                  <ul className="list-disc list-inside text-sm text-muted-foreground">
                    {structure?.reporting?.map((report: string, i: number) => (
                      <li key={i}>{report}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
}