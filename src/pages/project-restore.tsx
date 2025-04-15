import { useState } from 'react';
import { useProject } from '@/context/ProjectContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PageProps } from '@/types/page-props';

export function ProjectRestore({ onNavigate, projectData, setProjectData, savedProjects, setSavedProjects }: PageProps) {
  const [projectId, setProjectId] = useState('');
  const [error, setError] = useState('');

  const handleRestore = async () => {
    try {
      const response = await fetch(`http://localhost:5001/api/projects/${projectId}`);
      const data = await response.json();

      if (data.success) {
        setProjectData(data.project.projectData);
        onNavigate('/dashboard');
      } else {
        setError(data.error || 'Failed to restore project');
      }
    } catch (err) {
      setError('Failed to connect to server');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <Card className="max-w-md mx-auto">
        <CardHeader>
          <CardTitle>Restore Project</CardTitle>
          <CardDescription>Enter your project ID to restore your project data</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Input
              placeholder="Enter Project ID"
              value={projectId}
              onChange={(e) => setProjectId(e.target.value)}
            />
            {error && <p className="text-red-500">{error}</p>}
            <Button onClick={handleRestore} className="w-full">
              Restore Project
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 