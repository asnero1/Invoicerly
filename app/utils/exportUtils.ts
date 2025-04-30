import jsPDF from 'jspdf';

export function exportToCSV(data: any[], filename = 'export.csv') {
  const csv = [
    Object.keys(data[0]).join(','), // headers
    ...data.map(row => Object.values(row).join(','))
  ].join('\n');

  const blob = new Blob([csv], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.click();
}

export function exportToPDF(data: any[], filename = 'export.pdf') {
  const doc = new jsPDF();
  doc.setFontSize(12);
  let y = 10;

  data.forEach((entry, i) => {
    Object.entries(entry).forEach(([key, value]) => {
      doc.text(`${key}: ${value}`, 10, y);
      y += 6;
    });
    y += 4;
    if (y > 270) {
      doc.addPage();
      y = 10;
    }
  });

  doc.save(filename);
}
