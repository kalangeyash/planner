import { ThemeProvider } from '@/components/theme-provider';
import { AppRoutes } from '@/components/routes';
import { Toaster } from '@/components/ui/sonner';
import { ProjectProvider } from '@/context/ProjectContext';
import { BrowserRouter as Router } from 'react-router-dom';
import { StrictMode } from 'react';


function App() {
  return (
    <StrictMode>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Router>
          <ProjectProvider>
            <AppRoutes />
            <Toaster />
          </ProjectProvider>
        </Router>
      </ThemeProvider>
    </StrictMode>
  );
}

export default App;