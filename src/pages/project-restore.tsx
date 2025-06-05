import { useState } from 'react';
import { useProject } from '@/context/ProjectContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PageProps } from '@/types/page-props';
import { toast } from 'sonner';

export function ProjectRestore({ onNavigate, projectData, setProjectData, savedProjects, setSavedProjects }: PageProps) {
  const [projectId, setProjectId] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleRestore = async () => {
    if (!projectId.trim()) {
      setError('Please enter a project ID');
      return;
    }

    try {
      setIsLoading(true);
      setError('');

      const response = await fetch(`http://localhost:5001/api/projects/${projectId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include'
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to restore project');
      }

      if (!data.success || !data.data) {
        throw new Error('Invalid project data received');
      }

      // Set the project data and navigate to dashboard
      setProjectData(data.data.projectData);
      toast.success('Project restored successfully');
      onNavigate('/dashboard');
    } catch (err) {
      console.error('Restore error:', err);
      const errorMessage = err instanceof Error ? err.message : 'Failed to connect to server';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-screen w-screen flex justify-center items-center container mx-auto p-4">
      <Card className="max-w-md mx-auto w-full">
        <CardHeader>
          <CardTitle>Restore Project</CardTitle>
          <CardDescription>Enter your project ID to restore your project data</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Input
              placeholder="Enter Project ID"
              value={projectId}
              onChange={(e) => {
                setProjectId(e.target.value);
                setError(''); // Clear error when user types
              }}
              disabled={isLoading}
            />
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <div className="flex gap-2">
              <Button 
                onClick={() => onNavigate('/form')} 
                variant="outline" 
                className="flex-1"
                disabled={isLoading}
              >
                Back
              </Button>
              <Button 
                onClick={handleRestore} 
                className="flex-1"
                disabled={isLoading}
              >
                {isLoading ? 'Restoring...' : 'Restore Project'}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 