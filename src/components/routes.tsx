import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
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

export function AppRoutes() {
  return (
    <Router>
      <AnimatePresence mode="wait">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/form" element={<ProjectForm />} />
          <Route path="/roadmap" element={<ProjectRoadmap />} />
          <Route path="/architecture" element={<SystemArchitecture />} />
          <Route path="/timeline" element={<Timeline />} />
          <Route path="/techstack" element={<TechStack />} />
          <Route path="/costs" element={<CostBreakdown />} />
          <Route path="/team" element={<TeamPlanning />} />
          <Route path="/risks" element={<RiskAssessment />} />
          <Route path="/dashboard" element={<ProjectDashboard />} />
          <Route path="/comparison" element={<ProjectComparison />} />
          <Route path="/resources" element={<ResourceAllocation />} />
          <Route path="/dependencies" element={<DependencyGraph />} />
          <Route path="/documentation" element={<ProjectDocumentation />} />
          <Route path="/health" element={<ProjectHealth />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AnimatePresence>
    </Router>
  );
}