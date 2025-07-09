import { CanvasElement, CertificateData, CertificateCustomization } from "@/types/certificate";

export class CertificateCanvas {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private elements: CanvasElement[] = [];
  private selectedElement: string | null = null;
  private scale: number = 1;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d')!;
    this.setupCanvas();
  }

  private setupCanvas() {
    this.canvas.width = 1120; // 8.5" * 132 DPI for high quality
    this.canvas.height = 792;  // 6" * 132 DPI
    this.canvas.style.width = '100%';
    this.canvas.style.height = 'auto';
    this.canvas.style.maxWidth = '800px';
