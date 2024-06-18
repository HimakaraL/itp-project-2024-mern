const router = require("express").Router();
const Employee = require("../models/Employee");
const requireAuth = require("../middleware/requireAuth");

// Create a new employee
router.post("/createEmployee", requireAuth, async (req, res) => {
  try {
    // Validate request body
    const requiredFields = ['FirstName', 'LastName', 'Nic', 'gender', 'dob', 'contactNo', 'email', 'qualifications', 'position', 'dateOfJoining'];
    const missingFields = requiredFields.filter(field => !req.body[field]);
    if (missingFields.length > 0) {
      return res.status(400).json({ message: `Missing required fields: ${missingFields.join(', ')}` });
    }

    // Check if NIC number already exists
    const existingEmployee = await Employee.findOne({ Nic: req.body.Nic });
    if (existingEmployee) {
      return res.status(400).json({ message: 'Employee with this NIC number already exists' });
    }

    const newEmployee = await Employee.create(req.body);
    return res.status(201).json(newEmployee);
  } catch (error) {
    console.error('Error creating employee:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

// Get all employees
router.get("/employees", async (req, res) => {
  try {
    const employees = await Employee.find();
    return res.status(200).json({ count: employees.length, data: employees });
  } catch (error) {
    console.error('Error fetching employees:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

// Update an employee
router.put("/updateEmployee/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updatedEmployee = await Employee.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedEmployee) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    return res.status(200).json({ message: 'Employee updated successfully', data: updatedEmployee });
  } catch (error) {
    console.error('Error updating employee:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

// Delete an employee
router.delete("/deleteEmployee/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedEmployee = await Employee.findByIdAndDelete(id);
    if (!deletedEmployee) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    return res.status(200).json({ message: 'Employee deleted successfully' });
  } catch (error) {
    console.error('Error deleting employee:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

// Get an employee by ID
router.get("/getEmployee/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const employee = await Employee.findById(id);
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    return res.status(200).json(employee);
  } catch (error) {
    console.error('Error fetching employee:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;