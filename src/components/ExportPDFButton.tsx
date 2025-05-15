import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { pdf } from '@react-pdf/renderer';
import { ProjectReportPDF } from "./ProjectReportPDF";

interface ExportPDFButtonProps {
  projectData: any;
}

export function ExportPDFButton({ projectData }: ExportPDFButtonProps) {
  const handleExport = async () => {
    try {
      const blob = await pdf(<ProjectReportPDF projectData={projectData} />).toBlob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${projectData.name}-project-report.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };

  return (
    <Button onClick={handleExport} className="flex items-center gap-2">
      <Download className="h-4 w-4" />
      Export PDF
    </Button>
  );
} 