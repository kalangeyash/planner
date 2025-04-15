import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
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

  // Save project data to MongoDB whenever it changes
  useEffect(() => {
    const saveProjectData = async () => {
      if (projectData) {
        try {
          const response = await fetch('http://localhost:5001/api/projects/save', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({
              projectId: projectData.id || Date.now().toString(),
              projectData,
            }),
          });

          if (!response.ok) {
            console.error('Failed to save project data');
          }
        } catch (error) {
          console.error('Error saving project data:', error);
        }
      }
    };

    saveProjectData();
  }, [projectData]);

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