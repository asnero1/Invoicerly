// test-invoice.cjs

const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

const doc = new PDFDocument({ size: 'A4', margin: 50 });

const outputPath = path.join(__dirname, 'output/invoice-test.pdf');
const fontPath = path.join(__dirname, 'assets/fonts/Roboto-Regular.woff');

fs.mkdirSync(path.dirname(outputPath), { recursive: true });

doc.pipe(fs.createWriteStream(outputPath));

doc.registerFont('Roboto', fontPath);

doc
  .font('Roboto')
  .fontSize(20)
  .text('Invoice #001', { align: 'left' })
  .moveDown()
  .fontSize(12)
  .text('Billed to: John Doe')
  .text('Service: Web development')
  .text('Amount: $2,000')
  .text('Date: 2025-03-26');

doc.end();
