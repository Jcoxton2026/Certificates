import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { exportToPDF, downloadAsImage } from "@/lib/pdf-export";
import { useToast } from "@/hooks/use-toast";
import { 
  User, 
  Type, 
  Palette, 
  Layout, 
  Download,
  FileText,
  Image as ImageIcon
} from "lucide-react";
import type { CertificateData, CertificateCustomization } from "@/types/certificate";

interface CustomizationPanelProps {
  certificateData: CertificateData;
  onDataChange: (data: CertificateData) => void;
  customization: CertificateCustomization;
  onCustomizationChange: (customization: CertificateCustomization) => void;
}

export default function CustomizationPanel({
  certificateData,
  onDataChange,
  customization,
  onCustomizationChange
}: CustomizationPanelProps) {
  const { toast } = useToast();

  const handleDataChange = (field: keyof CertificateData, value: string) => {
    onDataChange({ ...certificateData, [field]: value });
  };

  const handleCustomizationChange = (field: keyof CertificateCustomization, value: any) => {
    onCustomizationChange({ ...customization, [field]: value });
  };

  const handleExportPDF = async () => {
    try {
      const canvas = document.querySelector('canvas');
      if (canvas) {
        await exportToPDF(canvas, 'certificate');
        toast({
          title: "PDF Export",
          description: "Certificate exported as PDF successfully.",
        });
      }
    } catch (error) {
      toast({
        title: "Export Failed",
        description: "Failed to export PDF. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleExportPNG = async () => {
    try {
      const canvas = document.querySelector('canvas');
      if (canvas) {
        await downloadAsImage(canvas, 'certificate');
        toast({
          title: "Image Export",
          description: "Certificate downloaded as PNG successfully.",
        });
      }
    } catch (error) {
      toast({
        title: "Export Failed",
        description: "Failed to export image. Please try again.",
        variant: "destructive",
      });
    }
  };

  const colorSchemes = [
    { name: "Gold", primary: "#f59e0b", secondary: "#fbbf24" },
    { name: "Blue", primary: "#2563eb", secondary: "#60a5fa" },
    { name: "Emerald", primary: "#059669", secondary: "#34d399" },
    { name: "Red", primary: "#dc2626", secondary: "#f87171" },
    { name: "Purple", primary: "#7c3aed", secondary: "#a78bfa" },
  ];

  return (
    <aside className="w-80 bg-white border-l border-neutral-200 overflow-y-auto">
      <div className="p-6 space-y-6">
        <h2 className="text-lg font-semibold text-secondary">Customize Certificate</h2>

        {/* Recipient Information */}
        <Card className="p-4">
          <h3 className="text-sm font-medium text-secondary mb-3 flex items-center">
            <User className="h-4 w-4 mr-2 text-primary" />
            Recipient Information
          </h3>
          <div className="space-y-3">
            <div>
              <Label htmlFor="recipientName">Recipient Name</Label>
              <Input
                id="recipientName"
                value={certificateData.recipientName}
                onChange={(e) => handleDataChange('recipientName', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="courseName">Course/Achievement</Label>
              <Input
                id="courseName"
                value={certificateData.courseName}
                onChange={(e) => handleDataChange('courseName', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="completionDate">Completion Date</Label>
              <Input
                id="completionDate"
                type="date"
                value={certificateData.completionDate}
                onChange={(e) => handleDataChange('completionDate', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="instructorName">Instructor/Authority</Label>
              <Input
                id="instructorName"
                value={certificateData.instructorName}
                onChange={(e) => handleDataChange('instructorName', e.target.value)}
              />
            </div>
          </div>
        </Card>

        {/* Typography Controls */}
        <Card className="p-4">
          <h3 className="text-sm font-medium text-secondary mb-3 flex items-center">
            <Type className="h-4 w-4 mr-2 text-primary" />
            Typography
          </h3>
          <div className="space-y-3">
            <div>
              <Label>Title Font</Label>
              <Select 
                value={customization.titleFont} 
                onValueChange={(value) => handleCustomizationChange('titleFont', value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Playfair Display">Playfair Display</SelectItem>
                  <SelectItem value="Georgia">Georgia</SelectItem>
                  <SelectItem value="Times New Roman">Times New Roman</SelectItem>
                  <SelectItem value="Merriweather">Merriweather</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Body Font</Label>
              <Select 
                value={customization.bodyFont} 
                onValueChange={(value) => handleCustomizationChange('bodyFont', value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Inter">Inter</SelectItem>
                  <SelectItem value="Open Sans">Open Sans</SelectItem>
                  <SelectItem value="Roboto">Roboto</SelectItem>
                  <SelectItem value="Lato">Lato</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label>Title Size</Label>
                <Slider
                  value={[customization.titleSize]}
                  onValueChange={([value]) => handleCustomizationChange('titleSize', value)}
                  min={24}
                  max={48}
                  step={2}
                  className="mt-2"
                />
                <span className="text-xs text-neutral-500">{customization.titleSize}px</span>
              </div>
              <div>
                <Label>Body Size</Label>
                <Slider
                  value={[customization.bodySize]}
                  onValueChange={([value]) => handleCustomizationChange('bodySize', value)}
                  min={12}
                  max={24}
                  step={1}
                  className="mt-2"
                />
                <span className="text-xs text-neutral-500">{customization.bodySize}px</span>
              </div>
            </div>
          </div>
        </Card>

        {/* Color Scheme */}
        <Card className="p-4">
          <h3 className="text-sm font-medium text-secondary mb-3 flex items-center">
            <Palette className="h-4 w-4 mr-2 text-primary" />
            Color Scheme
          </h3>
          <div className="space-y-3">
            <div className="grid grid-cols-5 gap-2">
              {colorSchemes.map((scheme) => (
                <button
                  key={scheme.name}
                  className={`w-10 h-10 rounded-lg border-2 transition-all ${
                    customization.accentColor === scheme.primary
                      ? 'border-primary shadow-md scale-110'
                      : 'border-neutral-200'
                  }`}
                  style={{ backgroundColor: scheme.primary }}
                  onClick={() => handleCustomizationChange('accentColor', scheme.primary)}
                  title={scheme.name}
                />
              ))}
            </div>
            <div>
              <Label>Background</Label>
              <div className="flex space-x-2 mt-1">
                <input
                  type="color"
                  value={customization.backgroundColor}
                  onChange={(e) => handleCustomizationChange('backgroundColor', e.target.value)}
                  className="w-12 h-8 rounded border border-neutral-200"
                />
                <input
                  type="color"
                  value={customization.accentColor}
                  onChange={(e) => handleCustomizationChange('accentColor', e.target.value)}
                  className="w-12 h-8 rounded border border-neutral-200"
                />
              </div>
            </div>
          </div>
        </Card>

        {/* Layout Options */}
        <Card className="p-4">
          <h3 className="text-sm font-medium text-secondary mb-3 flex items-center">
            <Layout className="h-4 w-4 mr-2 text-primary" />
            Layout & Design
          </h3>
          <div className="space-y-3">
            <div>
              <Label>Border Style</Label>
              <Select 
                value={customization.borderStyle} 
                onValueChange={(value) => handleCustomizationChange('borderStyle', value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Classic Ornate">Classic Ornate</SelectItem>
                  <SelectItem value="Modern Minimal">Modern Minimal</SelectItem>
                  <SelectItem value="Decorative Flourish">Decorative Flourish</SelectItem>
                  <SelectItem value="No Border">No Border</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Certificate Size</Label>
              <Select 
                value={customization.certificateSize} 
                onValueChange={(value) => handleCustomizationChange('certificateSize', value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Letter (8.5 x 11)">Letter (8.5&quot; x 11&quot;)</SelectItem>
                  <SelectItem value="A4 (8.27 x 11.7)">A4 (8.27&quot; x 11.7&quot;)</SelectItem>
                  <SelectItem value="Legal (8.5 x 14)">Legal (8.5&quot; x 14&quot;)</SelectItem>
                  <SelectItem value="Custom">Custom</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </Card>

        {/* Export Options */}
        <Card className="p-4">
          <h3 className="text-sm font-medium text-secondary mb-3 flex items-center">
            <Download className="h-4 w-4 mr-2 text-primary" />
            Export Options
          </h3>
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <Button 
                variant="outline"
                className="flex flex-col items-center p-4 h-auto border-red-200 text-red-700 hover:bg-red-50"
                onClick={handleExportPDF}
              >
                <FileText className="h-6 w-6 mb-1" />
                <span className="text-sm">PDF</span>
              </Button>
              <Button 
                variant="outline"
                className="flex flex-col items-center p-4 h-auto border-blue-200 text-blue-700 hover:bg-blue-50"
                onClick={handleExportPNG}
              >
                <ImageIcon className="h-6 w-6 mb-1" />
                <span className="text-sm">PNG</span>
              </Button>
            </div>
            <div>
              <Label>Quality</Label>
              <Select 
                value={customization.quality} 
                onValueChange={(value) => handleCustomizationChange('quality', value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="High (300 DPI)">High (300 DPI)</SelectItem>
                  <SelectItem value="Medium (150 DPI)">Medium (150 DPI)</SelectItem>
                  <SelectItem value="Web (72 DPI)">Web (72 DPI)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </Card>
      </div>
    </aside>
  );
}
