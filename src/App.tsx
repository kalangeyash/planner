import { ThemeProvider } from '@/components/theme-provider';
import { AppRoutes } from '@/components/routes';
import { Toaster } from '@/components/ui/sonner';
import { ProjectProvider } from '@/context/ProjectContext';

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <ProjectProvider>
        <AppRoutes />
        <Toaster />
      </ProjectProvider>
    </ThemeProvider>
  );
}

export default App;