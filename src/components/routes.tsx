import { Routes, Route, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { useProject } from '@/context/ProjectContext';
import { PageProps } from '@/types/page-props';

import { LandingPage } from '@/pages/landing';
import { ProjectForm } from '@/pages/project-form';
import { ProjectRoadmap } from '@/pages/project-roadmap';
import { SystemArchitecture } from '@/pages/system-architecture';
import { Timeline } from '@/pages/timeline';
import { TechStack } from '@/pages/tech-stack';
import { CostBreakdown } from '@/pages/cost-breakdown';
import { RiskAssessment } from '@/pages/risk-assessment';
import { ProjectDashboard } from '@/pages/project-dashboard';
import { ProjectRestore } from '@/pages/project-restore';

export function AppRoutes() {
  const { projectData, setProjectData, savedProjects, setSavedProjects, navigateTo } = useProject();

  const pageProps: PageProps = {
    onNavigate: navigateTo,
    projectData,
    setProjectData,
    savedProjects,
    setSavedProjects,
  };

  return (
    <AnimatePresence mode="wait">
      <Routes>
        <Route path="/" element={<LandingPage {...pageProps} />} />
        <Route path="/form" element={<ProjectForm {...pageProps} />} />
        <Route path="/roadmap" element={<ProjectRoadmap {...pageProps} />} />
        <Route path="/architecture" element={<SystemArchitecture {...pageProps} />} />
        <Route path="/timeline" element={<Timeline {...pageProps} />} />
        <Route path="/techstack" element={<TechStack {...pageProps} />} />
        <Route path="/costs" element={<CostBreakdown {...pageProps} />} />
        <Route path="/risks" element={<RiskAssessment {...pageProps} />} />
        <Route path="/dashboard" element={<ProjectDashboard {...pageProps} />} />
        <Route path="/restore" element={<ProjectRestore {...pageProps} />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AnimatePresence>
  );
}