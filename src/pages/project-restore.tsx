import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PageProps } from "@/types/page-props";
import { toast } from "sonner";

export function ProjectRestore({ onNavigate, setProjectData }: PageProps) {
  const [projectId, setProjectId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleRestore = async () => {
    if (!projectId.trim()) {
      setError("Please enter a project ID");
      return;
    }

    try {
      setIsLoading(true);
      setError("");

      const response = await fetch(
        `https://planner-hot9.onrender.com/api/projects/${projectId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to restore project");
      }

      if (!data.projectData) {
        throw new Error("Invalid project data received");
      }

      // Set the project data and navigate to dashboard
      setProjectData(data.projectData);
      toast.success("Project restored successfully");
      onNavigate("/dashboard");
    } catch (err) {
      console.error("Restore error:", err);
      const errorMessage =
        err instanceof Error ? err.message : "Failed to connect to server";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-screen flex justify-center items-center bg-background">
      <Card className="max-w-md w-full p-4">
        <CardHeader>
          <CardTitle>Restore Project</CardTitle>
          <CardDescription>
            Enter your project ID to restore your project data
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Input
              placeholder="Enter Project ID"
              value={projectId}
              onChange={(e) => {
                setProjectId(e.target.value);
                setError(""); // Clear error when user types
              }}
              disabled={isLoading}
            />
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <div className="flex gap-2">
              <Button
                onClick={() => onNavigate("/form")}
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
                {isLoading ? "Restoring..." : "Restore Project"}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
