import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import TemplateGallery from "@/components/template-gallery";
import CertificateCanvas from "@/components/certificate-canvas";
import CustomizationPanel from "@/components/customization-panel";
import PreviewModal from "@/components/preview-modal";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Save, Download, HelpCircle, Users } from "lucide-react";
import type { CertificateTemplate } from "@shared/schema";
import type { CertificateData, CertificateCustomization } from "@/types/certificate";

export default function CertificateMaker() {
  const { toast } = useToast();
  const [selectedTemplate, setSelectedTemplate] = useState<CertificateTemplate | null>(null);
