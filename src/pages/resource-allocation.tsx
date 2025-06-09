import { motion } from 'framer-motion';
import { ArrowLeft, BarChart2, Clock, DollarSign, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useEffect, useState } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

interface ResourceType {
  name: string;
  allocation: number;
  budgetShare: number;
  color: string;
}

export function ResourceAllocation({
  onNavigate,
  projectData
}: {
  onNavigate: (page: string) => void;
  projectData: any;
}) {
  const [isLoading, setIsLoading] = useState(true);
  const [resourceTypes, setResourceTypes] = useState<ResourceType[]>([]);

  useEffect(() => {
    if (!projectData) {
      onNavigate('form');
      return;
    }

    if (!projectData?.insights?.team) {
      onNavigate('form');
      return;
    }

    const { roles } = projectData.insights.team;
    const totalTeamMembers = roles.length;

    const calculatedResources = [
      {
        name: 'Development',
        allocation: Math.round((roles.filter((r: any) => 
          r.title.toLowerCase().includes('developer') || 
          r.title.toLowerCase().includes('engineer')
        ).length / totalTeamMembers) * 100),
        budgetShare: 0.45,
        color: 'bg-blue-500'
      },
      {
        name: 'Design & UX',
        allocation: Math.round((roles.filter((r: any) => 
          r.title.toLowerCase().includes('design') || 
          r.title.toLowerCase().includes('ux')
        ).length / totalTeamMembers) * 100),
        budgetShare: 0.15,
        color: 'bg-purple-500'
      },
      {
        name: 'Project Management',
        allocation: Math.round((roles.filter((r: any) => 
          r.title.toLowerCase().includes('manager') || 
          r.title.toLowerCase().includes('lead')
        ).length / totalTeamMembers) * 100),
        budgetShare: 0.20,
        color: 'bg-green-500'
      },
      {
        name: 'QA & Testing',
        allocation: Math.round((roles.filter((r: any) => 
          r.title.toLowerCase().includes('qa') || 
          r.title.toLowerCase().includes('test')
        ).length / totalTeamMembers) * 100),
        budgetShare: 0.10,
        color: 'bg-yellow-500'
      },
      {
        name: 'DevOps & Infrastructure',
        allocation: Math.round((roles.filter((r: any) => 
          r.title.toLowerCase().includes('devops') || 
          r.title.toLowerCase().includes('ops')
        ).length / totalTeamMembers) * 100),
        budgetShare: 0.10,
        color: 'bg-red-500'
      }
    ];

    setResourceTypes(calculatedResources);
    setIsLoading(false);
  }, [projectData, onNavigate]);

  if (isLoading || !projectData) {
    return (
      <div className="container py-10">
        <div className="flex items-center justify-between mb-8">
          <div>
            <Skeleton className="h-8 w-[250px] mb-2" />
            <Skeleton className="h-4 w-[300px]" />
          </div>
          <Skeleton className="h-10 w-[150px]" />
        </div>
        <div className="grid gap-6">
          <div className="grid md:grid-cols-2 gap-6">
            <Skeleton className="h-[300px]" />
            <Skeleton className="h-[300px]" />
          </div>
          <Skeleton className="h-[300px]" />
          <Skeleton className="h-[200px]" />
        </div>
      </div>
    );
  }

  const totalTeamMembers = projectData.insights.team.roles.length;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="container py-10"
    >
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Resource Allocation</h1>
          <p className="text-muted-foreground">
            Resource distribution for {projectData.name}
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
        <div className="grid md:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Team Distribution
                </CardTitle>
                <CardDescription>Allocation of human resources</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {resourceTypes.map((type, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div className="flex justify-between mb-2">
                        <span className="font-medium">{type.name}</span>
                        <span>{type.allocation}%</span>
                      </div>
                      <Progress value={type.allocation} className={type.color} />
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5" />
                  Budget Allocation
                </CardTitle>
                <CardDescription>Distribution of project budget</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {resourceTypes.map((type, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div className="flex justify-between mb-2">
                        <span className="font-medium">{type.name}</span>
                        <span>${(projectData.budget * type.budgetShare).toLocaleString()}</span>
                      </div>
                      <Progress value={type.budgetShare * 100} className={type.color} />
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {projectData.insights.timeline?.milestones && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Resource Timeline
                </CardTitle>
                <CardDescription>Resource allocation across project phases</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {projectData.insights.timeline.milestones.map((milestone: any, index: number) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="border-l-2 border-primary pl-4"
                    >
                      <h3 className="font-semibold">{milestone.name}</h3>
                      <p className="text-sm text-muted-foreground mb-2">{milestone.date}</p>
                      <div className="flex gap-2">
                        {resourceTypes.map((type, typeIndex) => (
                          <div
                            key={typeIndex}
                            className={`${type.color} px-2 py-1 rounded text-xs text-white`}
                          >
                            {type.name.split(' ')[0]}
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart2 className="h-5 w-5" />
                Resource Utilization
              </CardTitle>
              <CardDescription>Current resource utilization metrics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-4 gap-6">
                <div className="space-y-2">
                  <h3 className="font-semibold">Team Members</h3>
                  <p className="text-2xl font-bold">{totalTeamMembers}</p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold">Total Budget</h3>
                  <p className="text-2xl font-bold">${projectData.budget.toLocaleString()}</p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold">Project Duration</h3>
                  <p className="text-2xl font-bold">
                    {projectData.insights.timeline?.milestones?.length || 0} Phases
                  </p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold">Resource Types</h3>
                  <p className="text-2xl font-bold">{resourceTypes.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
}