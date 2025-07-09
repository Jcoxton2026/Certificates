import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { CertificateCanvas as CanvasUtil } from "@/lib/canvas-utils";
import { 
  Undo, 
  Redo, 
  ZoomIn, 
  ZoomOut, 
  Maximize, 
  Printer 
} from "lucide-react";
import type { CertificateTemplate } from "@shared/schema";
import type { CertificateData, CertificateCustomization } from "@/types/certificate";

interface CertificateCanvasProps {
  template: CertificateTemplate | null;
  certificateData: CertificateData;
  customization: CertificateCustomization;
}

export default function CertificateCanvas({ 
  template, 
  certificateData, 
  customization 
}: CertificateCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvasUtilRef = useRef<CanvasUtil | null>(null);
  const [zoom, setZoom] = useState(100);

  useEffect(() => {
    if (canvasRef.current && !canvasUtilRef.current) {
      canvasUtilRef.current = new CanvasUtil(canvasRef.current);
    }
  }, []);

  useEffect(() => {
    if (canvasUtilRef.current && template) {
      canvasUtilRef.current.loadTemplate(
        template.config,
        certificateData,
        customization
      );
    }
  }, [template, certificateData, customization]);

  const handleZoomIn = () => {
    setZoom(prev => Math.min(prev + 25, 200));
  };

  const handleZoomOut = () => {
    setZoom(prev => Math.max(prev - 25, 50));
  };

  const handlePrint = () => {
    if (canvasRef.current) {
      const printWindow = window.open('', '_blank');
      if (printWindow) {
        const imageData = canvasRef.current.toDataURL('image/png', 1.0);
        printWindow.document.write(`
          <html>
            <head><title>Certificate</title></head>
            <body style="margin:0;padding:20px;text-align:center;">
              <img src="${imageData}" style="max-width:100%;height:auto;" />
              <script>window.onload=function(){window.print();}</script>
            </body>
          </html>
        `);
        printWindow.document.close();
      }
    }
  };

  return (
    <main className="flex-1 flex flex-col">
      {/* Canvas Toolbar */}
      <div className="bg-white border-b border-neutral-200 px-6 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h3 className="font-medium text-secondary">
              {template?.name || "Select a template"}
            </h3>
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="icon" title="Undo">
                <Undo className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" title="Redo">
                <Redo className="h-4 w-4" />
              </Button>
              <div className="w-px h-6 bg-neutral-200"></div>
              <Button 
                variant="ghost" 
                size="icon" 
                title="Zoom In"
                onClick={handleZoomIn}
              >
                <ZoomIn className="h-4 w-4" />
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                title="Zoom Out"
                onClick={handleZoomOut}
              >
                <ZoomOut className="h-4 w-4" />
              </Button>
              <span className="text-sm text-neutral-500">{zoom}%</span>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Button variant="secondary">
              <Maximize className="h-4 w-4 mr-2" />
              Preview
            </Button>
            <Button variant="secondary" onClick={handlePrint}>
              <Printer className="h-4 w-4 mr-2" />
              Print
            </Button>
          </div>
        </div>
      </div>

      {/* Canvas Area */}
      <div className="flex-1 bg-neutral-100 p-8 overflow-auto">
        <div className="max-w-4xl mx-auto">
          <div 
            className="bg-white rounded-lg shadow-lg p-8 inline-block"
            style={{ transform: `scale(${zoom / 100})`, transformOrigin: 'top center' }}
          >
            <canvas
              ref={canvasRef}
              className="border border-neutral-200 rounded-lg"
              style={{ 
                maxWidth: '100%',
                height: 'auto'
              }}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
