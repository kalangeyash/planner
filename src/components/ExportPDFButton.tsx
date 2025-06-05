import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { pdf } from '@react-pdf/renderer';
import { ProjectReportPDF } from "./ProjectReportPDF";
import { toast } from "sonner";
import mermaid from 'mermaid';

interface ExportPDFButtonProps {
  projectData: any;
}

export function ExportPDFButton({ projectData }: ExportPDFButtonProps) {
  const handleExport = async () => {
    if (!projectData) {
      toast.error('No project data available');
      return;
    }

    try {
      // Show loading toast
      const loadingToast = toast.loading('Generating PDF report...');

      // Create a copy of project data to avoid modifying the original
      const pdfData = {
        ...projectData,
        insights: {
          ...projectData.insights,
          architecture: {
            ...projectData.insights.architecture,
            // Convert Mermaid diagram to a more PDF-friendly format
            diagram: projectData.insights.architecture?.mermaid || 'No diagram available'
          }
        }
      };

      // Create the PDF document
      const blob = await pdf(
        <ProjectReportPDF projectData={pdfData} />
      ).toBlob();

      // Create a download link
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      
      // Format filename
      const projectName = projectData.name || 'project';
      const formattedName = projectName
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
      
      link.download = `${formattedName}-project-report.pdf`;
      
      // Trigger the download
      document.body.appendChild(link);
      link.click();
      
      // Clean up
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
      // Update toast
      toast.dismiss(loadingToast);
      toast.success('PDF report downloaded successfully');
    } catch (error) {
      console.error('Error generating PDF:', error);
      toast.error('Failed to generate PDF report. Please try again.');
    }
  };

  return (
    <Button 
      onClick={handleExport} 
      className="flex items-center gap-2"
      variant="outline"
      size="sm"
      disabled={!projectData}
    >
      <Download className="h-4 w-4" />
      Export PDF
    </Button>
  );
} 