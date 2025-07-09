export async function exportToPDF(canvas: HTMLCanvasElement, filename: string): Promise<void> {
  try {
    // Create a new window/tab for printing
    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      throw new Error('Unable to open print window. Please allow popups.');
    }

    // Convert canvas to image
    const imageData = canvas.toDataURL('image/png', 1.0);
    
    // Create HTML content for printing
    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>${filename}</title>
          <style>
            body {
              margin: 0;
              padding: 20px;
              background: white;
              display: flex;
              justify-content: center;
              align-items: center;
              min-height: 100vh;
            }
            img {
              max-width: 100%;
              height: auto;
              border: 1px solid #ddd;
              box-shadow: 0 4px 8px rgba(0,0,0,0.1);
            }
            @media print {
              body {
                padding: 0;
              }
              img {
                border: none;
                box-shadow: none;
