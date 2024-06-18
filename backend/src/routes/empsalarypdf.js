const express = require('express');
const { buildSalaryPDF } = require('../../empSalary_Servicepdf'); // Import the PDF generation function
const Salary = require('../models/Salary');

const generateSalaryPDFRouter = express.Router();

generateSalaryPDFRouter.get('/invoice/salaries', async (req, res, next) => {
  try {
    // Fetch all salary records from the database
    const salaries = await Salary.find();

    if (salaries.length === 0) {
      return res.status(404).send({ message: 'No salaries found' });
    }

    // Generate the PDF for all salaries
    const dataCallback = (chunk) => {
      res.write(chunk);
    };

    const endCallback = () => {
      res.end();
    };

    // Call buildSalaryPDF function with appropriate arguments
    buildSalaryPDF(dataCallback, endCallback, salaries);
  } catch (error) {
    console.error('Error generating salary PDF:', error.message);
    res.status(500).send({ message: 'Internal server error' });
  }
});

module.exports = generateSalaryPDFRouter;
