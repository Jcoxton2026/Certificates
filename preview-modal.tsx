import { useEffect, useRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CertificateCanvas } from "@/lib/canvas-utils";
import { exportToPDF, downloadAsImage } from "@/lib/pdf-export";
import { useToast } from "@/hooks/use-toast";
import { Printer, X } from "lucide-react";
import type { CertificateTemplate } from "@shared/schema";
import type { CertificateData, CertificateCustomization } from "@/types/certificate";

interface PreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  template: CertificateTemplate | null;
  certificateData: CertificateData;
  customization: CertificateCustomization;
}

export default function PreviewModal({
  isOpen,
  onClose,
  template,
  certificateData,
  customization
}: PreviewModalProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvasUtilRef = useRef<CertificateCanvas | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (isOpen && canvasRef.current && template) {
      if (!canvasUtilRef.current) {
        canvasUtilRef.current = new CertificateCanvas(canvasRef.current);
      }
      canvasUtilRef.current.loadTemplate(
        template.config,
        certificateData,
        customization
      );
    }
  }, [isOpen, template, certificateData, customization]);

  const handlePrint = async () => {
    try {
      if (canvasRef.current) {
        await exportToPDF(canvasRef.current, 'certificate-preview');
        toast({
          title: "Printing",
          description: "Certificate sent to printer.",
        });
      }
    } catch (error) {
      toast({
        title: "Print Failed",
        description: "Failed to print certificate. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle>Certificate Preview</DialogTitle>
            <div className="flex items-center space-x-3">
              <Button variant="outline" onClick={handlePrint}>
                <Printer className="h-4 w-4 mr-2" />
                Print
              </Button>
              <Button variant="ghost" size="icon" onClick={onClose}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </DialogHeader>
        
        <div className="bg-neutral-100 p-8 rounded-lg">
          <div className="flex justify-center">
            <canvas
              ref={canvasRef}
              className="border border-neutral-200 rounded-lg shadow-lg bg-white"
              style={{ 
                maxWidth: '100%',
                height: 'auto'
              }}
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
