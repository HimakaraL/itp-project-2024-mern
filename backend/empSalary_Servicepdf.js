const PDFDocument = require('pdfkit');

function buildSalaryPDF(dataCallback, endCallback, salaryData) {
  const doc = new PDFDocument({ bufferPages: true, font: 'Courier' });

  doc.on('data', dataCallback);
  doc.on('end', endCallback);

  doc.fontSize(18).text('Chandila light-Salary Details', { align: 'center' }).moveDown(0.5);

  // Add salary details section
  doc.fontSize(16).text('Salary Details', { underline: true });
  salaryData.forEach(salary => {
    doc.fontSize(12).text(`Name: ${salary.Name}`);
    doc.fontSize(12).text(`Eid: ${salary.Eid}`);
    doc.fontSize(12).text(`NIC: ${salary.Nic}`);
    doc.fontSize(12).text(`Job Position: ${salary.JobPosition}`);
    doc.fontSize(12).text(`Number of Dates: ${salary.NumberofDates}`);
    doc.fontSize(12).text(`OT Hours: ${salary.OtHours}`);
    doc.fontSize(12).text(`Basic Salary: ${salary.BasicSalary}`);
    doc.fontSize(12).text(`Net Salary: ${salary.NetSalary}`);
    doc.moveDown();
  });

  doc.end();
}

module.exports = { buildSalaryPDF };
