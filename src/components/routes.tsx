import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { useProject } from '@/context/ProjectContext';

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
  const { projectData, setProjectData, savedProjects, setSavedProjects, navigateTo } = useProject();

  const pageProps = {
    onNavigate: navigateTo,
    projectData,
    setProjectData,
    savedProjects,
    setSavedProjects,
  };

  return (
    <Router>
      <AnimatePresence mode="wait">
        <Routes>
          <Route path="/" element={<LandingPage {...pageProps} />} />
          <Route path="/form" element={<ProjectForm {...pageProps} />} />
          <Route path="/roadmap" element={<ProjectRoadmap {...pageProps} />} />
          <Route path="/architecture" element={<SystemArchitecture {...pageProps} />} />
          <Route path="/timeline" element={<Timeline {...pageProps} />} />
          <Route path="/techstack" element={<TechStack {...pageProps} />} />
          <Route path="/costs" element={<CostBreakdown {...pageProps} />} />
          <Route path="/team" element={<TeamPlanning {...pageProps} />} />
          <Route path="/risks" element={<RiskAssessment {...pageProps} />} />
          <Route path="/dashboard" element={<ProjectDashboard {...pageProps} />} />
          <Route path="/comparison" element={<ProjectComparison {...pageProps} />} />
          <Route path="/resources" element={<ResourceAllocation {...pageProps} />} />
          <Route path="/dependencies" element={<DependencyGraph {...pageProps} />} />
          <Route path="/documentation" element={<ProjectDocumentation {...pageProps} />} />
          <Route path="/health" element={<ProjectHealth {...pageProps} />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AnimatePresence>
    </Router>
  );
}