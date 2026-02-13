const fs = require('fs');
const pdfjsLib = require('pdfjs-dist/legacy/build/pdf.js');

async function readPDF() {
  const dataBuffer = new Uint8Array(fs.readFileSync('catalogo.pdf'));
  
  // Cargar el PDF
  const loadingTask = pdfjsLib.getDocument({ data: dataBuffer });
  const pdf = await loadingTask.promise;
  
  console.log('=== CATÁLOGO INVERSIONES JUAN BECERRA ===\n');
  console.log('Número de páginas:', pdf.numPages);
  console.log('=== CONTENIDO ===\n');
  
  let fullText = '';
  
  // Leer todas las páginas
  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const textContent = await page.getTextContent();
    const pageText = textContent.items.map(item => item.str).join(' ');
    fullText += pageText + '\n\n';
  }
  
  console.log(fullText);
}

readPDF().catch(console.error);
