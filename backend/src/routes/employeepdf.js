// employeepdf.js

const express = require('express');
const { buildPDF } = require('../../empsevicepdf');
const Employee = require('../models/Employee');

const generateEmployeePDFRouter = express.Router();

generateEmployeePDFRouter.get('/invoice/employees', async (req, res, next) => {
  try {
    // Fetch all employees from the database
    const employees = await Employee.find();

    if (employees.length === 0) {
      return res.status(404).send({ message: 'No employees found' });
    }

    // Generate the PDF for all employees
    const dataCallback = (chunk) => {
      res.write(chunk);
    };

    const endCallback = () => {
      res.end();
    };

    // Call buildPDF function with appropriate arguments
    buildPDF(dataCallback, endCallback, [], [], employees);
  } catch (error) {
    console.error('Error generating employee PDF:', error.message);
    res.status(500).send({ message: 'Internal server error' });
  }
});

module.exports = generateEmployeePDFRouter;
