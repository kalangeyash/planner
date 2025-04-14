import { createContext, useContext, useState, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

interface ProjectContextType {
  projectData: any;
  setProjectData: (data: any) => void;
  savedProjects: any[];
  setSavedProjects: (projects: any[]) => void;
  navigateTo: (path: string) => void;
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

export function ProjectProvider({ children }: { children: ReactNode }) {
  const [projectData, setProjectData] = useState<any>(null);
  const [savedProjects, setSavedProjects] = useState<any[]>([]);
  const navigate = useNavigate();

  const navigateTo = (path: string) => {
    navigate(path);
  };

  return (
    <ProjectContext.Provider
      value={{
        projectData,
        setProjectData,
        savedProjects,
        setSavedProjects,
        navigateTo,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
}

export function useProject() {
  const context = useContext(ProjectContext);
  if (context === undefined) {
    throw new Error('useProject must be used within a ProjectProvider');
  }
  return context;
} 