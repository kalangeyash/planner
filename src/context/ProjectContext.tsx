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
    // Ensure path starts with a forward slash
    const formattedPath = path.startsWith('/') ? path : `/${path}`;
    navigate(formattedPath);
  };

  // Load saved projects on mount
  useEffect(() => {
    const loadSavedProjects = async () => {
      try {
        const response = await fetch('https://planner-hot9.onrender.com/api/projects');
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
    const saveProjectData = async (data: any) => {
      if (!data) return;

      try {
        setIsLoading(true);
        const response = await fetch('https://planner-hot9.onrender.com/api/projects/save', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            projectId: data.projectId || 'default',
            projectData: data
          }),
          credentials: 'include'
        });

        const savedData = await response.json();

        if (!response.ok) {
          throw new Error(savedData.message || 'Failed to save project data');
        }

        setSavedProjects(prev => {
          const updated = [...prev];
          const index = updated.findIndex(p => p.projectId === data.projectId);
          if (index >= 0) {
            updated[index] = savedData;
          } else {
            updated.push(savedData);
          }
          return updated;
        });

        toast.success('Project data saved successfully');
      } catch (error) {
        console.error('Error saving project:', error);
        toast.error(error instanceof Error ? error.message : 'Failed to save project data');
      } finally {
        setIsLoading(false);
      }
    };

    saveProjectData(projectData);
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