export interface CertificateData {
  recipientName: string;
  courseName: string;
  completionDate: string;
  instructorName: string;
}

export interface CertificateCustomization {
  titleFont: string;
  bodyFont: string;
  titleSize: number;
  bodySize: number;
  colorScheme: string;
  backgroundColor: string;
  accentColor: string;
  borderStyle: string;
  certificateSize: string;
  quality: string;
}

export interface CanvasElement {
  id: string;
  type: 'text' | 'image';
  content: string;
  x: number;
  y: number;
  width: number;
  height: number;
  fontSize?: number;
  fontFamily?: string;
