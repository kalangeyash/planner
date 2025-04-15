import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

interface ProjectContextType {
  projectData: any;
  setProjectData: (data: any) => void;
  savedProjects: any[];
  setSavedProjects: (projects: any[]) => void;
  navigateTo: (path: string) => void;
  isLoading: boolean;
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

export function ProjectProvider({ children }: { children: ReactNode }) {
  const [projectData, setProjectData] = useState<any>(null);
  const [savedProjects, setSavedProjects] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const navigateTo = (path: string) => {
    navigate(path);
  };

  // Load saved projects on mount
  useEffect(() => {
    const loadSavedProjects = async () => {
      try {
        const response = await fetch('http://localhost:5001/api/projects');
        if (response.ok) {
          const data = await response.json();
          setSavedProjects(data.projects || []);
        }
      } catch (error) {
        console.error('Error loading saved projects:', error);
      }
    };

    loadSavedProjects();
  }, []);

  // Save project data to MongoDB whenever it changes
  useEffect(() => {
    const saveProjectData = async () => {
      if (projectData) {
        setIsLoading(true);
        try {
          const projectId = projectData.id || Date.now().toString();
          const response = await fetch('http://localhost:5001/api/projects/save', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              projectId,
              projectData: {
                ...projectData,
                id: projectId,
                updatedAt: new Date().toISOString(),
              },
            }),
          });

          if (!response.ok) {
            throw new Error('Failed to save project data');
          }

          const savedData = await response.json();
          setProjectData(savedData.projectData);
          toast.success('Project saved successfully');
        } catch (error) {
          console.error('Error saving project data:', error);
          toast.error('Failed to save project data');
        } finally {
          setIsLoading(false);
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
        isLoading,
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