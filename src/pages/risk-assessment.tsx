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
    onNavigate('dashboard');
    return null;
  }

  const { technical, business, operational, mitigation } = projectData.insights.risks;

  const categories = [
    { name: 'Technical Risks', items: technical, color: 'border-red-500' },
    { name: 'Business Risks', items: business, color: 'border-yellow-500' },
    { name: 'Operational Risks', items: operational, color: 'border-orange-500' },
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
          <h1 className="text-3xl font-bold mb-2">Risk Assessment</h1>
          <p className="text-muted-foreground">
            Potential risks and mitigation strategies for {projectData.name}
          </p>
        </div>
        <div className="flex gap-4">
          <Button
            variant="outline"
            onClick={() => onNavigate('team')}
          >
            Back to Team
          </Button>
          <Button
            onClick={() => onNavigate('dashboard')}
          >
            View Dashboard
            <ChevronRight className="ml-2 h-4 w-4" />
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
                      {category.items.map((risk: any, i: number) => (
                        <div
                          key={i}
                          className={`border-l-4 ${category.color} pl-4 py-2`}
                        >
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-medium">{risk.name}</span>
                            <span className={`px-2 py-0.5 rounded-full text-xs ${
                              risk.severity === 'High' ? 'bg-red-100 text-red-800' :
                              risk.severity === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-green-100 text-green-800'
                            }`}>
                              {risk.severity}
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground">{risk.description}</p>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>

              <div>
                <h3 className="font-semibold mb-4">Mitigation Strategies</h3>
                <div className="space-y-4">
                  {mitigation.map((strategy: any, index: number) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="border-l-2 border-primary pl-4 py-2"
                    >
                      <h4 className="font-medium mb-1">{strategy.risk}</h4>
                      <p className="text-sm text-muted-foreground">{strategy.strategy}</p>
                      {strategy.actions && (
                        <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                          {strategy.actions.map((action: string, i: number) => (
                            <li key={i}>• {action}</li>
                          ))}
                        </ul>
                      )}
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
}