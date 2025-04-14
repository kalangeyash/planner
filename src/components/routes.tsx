import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';

import { LandingPage } from '@/pages/landing';
import { ProjectForm } from '@/pages/project-form';
import { ProjectRoadmap } from '@/pages/project-roadmap';
import { SystemArchitecture } from '@/pages/system-architecture';
import { Timeline } from '@/pages/timeline';
import { TechStack } from '@/pages/tech-stack';
import { CostBreakdown } from '@/pages/cost-breakdown';
import { TeamPlanning } from '@/pages/team-planning';
import { RiskAssessment } from '@/pages/risk-assessment';
import { ProjectDashboard } from '@/pages/project-dashboard';
import { ProjectComparison } from '@/pages/project-comparison';
import { ResourceAllocation } from '@/pages/resource-allocation';
import { DependencyGraph } from '@/pages/dependency-graph';
import { ProjectDocumentation } from '@/pages/project-documentation';
import { ProjectHealth } from '@/pages/project-health';

export function Routes() {
  const [currentPage, setCurrentPage] = useState('landing');
  const [projectData, setProjectData] = useState<any>(null);
  const [savedProjects, setSavedProjects] = useState<any[]>([]);

  const pages: Record<string, React.ComponentType<any>> = {
    landing: LandingPage,
    form: ProjectForm,
    roadmap: ProjectRoadmap,
    architecture: SystemArchitecture,
    timeline: Timeline,
    techstack: TechStack,
    costs: CostBreakdown,
    team: TeamPlanning,
    risks: RiskAssessment,
    dashboard: ProjectDashboard,
    comparison: ProjectComparison,
    resources: ResourceAllocation,
    dependencies: DependencyGraph,
    documentation: ProjectDocumentation,
    health: ProjectHealth,
  };

  const CurrentPage = pages[currentPage];

  return (
    <AnimatePresence mode="wait">
      <div key={currentPage} className="w-full">
        {CurrentPage ? (
          <CurrentPage
            onNavigate={setCurrentPage}
            projectData={projectData}
            setProjectData={setProjectData}
            savedProjects={savedProjects}
            setSavedProjects={setSavedProjects}
          />
        ) : (
          <div className="p-10 text-center text-red-600 font-semibold">
            Page not found: {currentPage}
          </div>
        )}
      </div>
    </AnimatePresence>
  );
}