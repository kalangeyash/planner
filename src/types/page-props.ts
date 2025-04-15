export interface PageProps {
  onNavigate: (path: string) => void;
  projectData: any;
  setProjectData: (data: any) => void;
  savedProjects: any[];
  setSavedProjects: (projects: any[]) => void;
} 