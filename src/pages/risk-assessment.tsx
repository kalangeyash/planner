import { motion } from 'framer-motion';
import { AlertTriangle, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export function RiskAssessment({
  onNavigate,
  projectData
}: {
  onNavigate: (page: string) => void;
  projectData: any;
}) {
  if (!projectData?.insights?.risks) {
    onNavigate('form');
    return null;
  }

  const { technical = [], business = [], operational = [], mitigation = [] } = projectData.insights.risks;

  const categories = [
    { name: 'Technical Risks', items: Array.isArray(technical) ? technical : [], color: 'border-red-500' },
    { name: 'Business Risks', items: Array.isArray(business) ? business : [], color: 'border-yellow-500' },
    { name: 'Operational Risks', items: Array.isArray(operational) ? operational : [], color: 'border-orange-500' },
  ];

  const mitigationStrategies = Array.isArray(mitigation) ? mitigation : [];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex justify-center w-screen px-4 sm:px-6 md:px-8"
    >
      <div className="w-full max-w-7xl py-10">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold mb-2">Risk Assessment</h1>
            <p className="text-muted-foreground">
              Potential risks and mitigation strategies for {projectData.name}
            </p>
          </div>
          <div className="w-full sm:w-auto">
            <Button
              onClick={() => onNavigate('dashboard')}
              className="w-full sm:w-auto"
            >
              Dashboard <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5" />
                Risk Analysis
              </CardTitle>
              <CardDescription>Comprehensive risk assessment and mitigation strategies</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-6">
                  {categories.map((category, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <h3 className="font-semibold mb-4">{category.name}</h3>
                      <div className="space-y-4">
                        {category.items.map((risk: string, i: number) => (
                          <div
                            key={i}
                            className={`border-l-4 ${category.color} pl-4 py-2`}
                          >
                            <p className="text-sm text-muted-foreground">{risk}</p>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div>
                  <h3 className="font-semibold mb-4">Mitigation Strategies</h3>
                  <div className="space-y-4">
                    {mitigationStrategies.map((strategy: string, index: number) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="border-l-2 border-primary pl-4 py-2"
                      >
                        <p className="text-sm text-muted-foreground">{strategy}</p>
                      </motion.div>
                    ))}
                    {mitigationStrategies.length === 0 && (
                      <p className="text-sm text-muted-foreground">No mitigation strategies available</p>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </motion.div>
  );
}