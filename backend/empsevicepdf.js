const PDFDocument = require('pdfkit');


function buildPDF(dataCallback, endCallback, doctorFeedbackCounts, serviceFeedbackCounts, employeeData) {
  const doc = new PDFDocument({ bufferPages: true, font: 'Courier' });

  doc.on('data', dataCallback);
  doc.on('end', endCallback);

  doc.fontSize(18).text('Chandila light-Employee Details', { align: 'center' }).moveDown(0.5);

  // Add employee details section
  doc.fontSize(16).text('Employee Details', { underline: true });
  employeeData.forEach(employee => {
    doc.fontSize(12).text(`First Name: ${employee.FirstName}`);
    doc.fontSize(12).text(`Last Name: ${employee.LastName}`);
    doc.fontSize(12).text(`NIC: ${employee.Nic}`);
    doc.fontSize(12).text(`Gender: ${employee.gender}`);
    doc.fontSize(12).text(`Date of Birth: ${new Date(employee.dob).toLocaleDateString()}`);
    doc.fontSize(12).text(`Contact Number: ${employee.contactNo}`);
    doc.fontSize(12).text(`Email: ${employee.email}`);
    doc.fontSize(12).text(`Qualifications: ${employee.qualifications}`);
    doc.fontSize(12).text(`Position: ${employee.position}`);
    doc.fontSize(12).text(`Date of Joining: ${new Date(employee.dateOfJoining).toLocaleDateString()}`);
    doc.fontSize(12).text(`Termination Date: ${employee.terminationDate ? new Date(employee.terminationDate).toLocaleDateString() : '-'}`);
    doc.moveDown();
  });

  doc.end();
}

module.exports = { buildPDF };

