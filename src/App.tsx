import { ThemeProvider } from '@/components/theme-provider';
import { Routes } from '@/components/routes';
import { Toaster } from '@/components/ui/sonner';

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Routes />
      <Toaster />
    </ThemeProvider>
  );
}

export default App;