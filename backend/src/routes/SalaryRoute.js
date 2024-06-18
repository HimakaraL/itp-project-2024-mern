const router = require("express").Router();
const Salary = require("../models/Salary");
const requireAuth = require("../middleware/requireAuth");

// Create a new salary record
router.post("/createSalary", requireAuth, async (req, res) => {
    try {
        const { Nic } = req.body;
        const existingSalary = await Salary.findOne({ Nic });
        if (existingSalary) {
            return res.status(400).json({ message: 'Employee with this NIC number already exists' });
        }

        const { BasicSalary, OtRate, OtHours } = req.body;
        const NetSalary = parseFloat(BasicSalary) + parseFloat(OtRate) * parseFloat(OtHours);
        const newSalary = await Salary.create({ ...req.body, NetSalary });
        res.status(201).json(newSalary);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

// Update a salary record
router.put("/updateSalary/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { BasicSalary, OtRate, OtHours } = req.body;
        const NetSalary = parseFloat(BasicSalary) + parseFloat(OtRate) * parseFloat(OtHours);
        const updatedSalary = await Salary.findByIdAndUpdate(id, { ...req.body, NetSalary }, { new: true });
        res.status(200).json(updatedSalary);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

// Get all salary records
router.get("/salaries", async (req, res) => {
    try {
        const salaries = await Salary.find();
        res.status(200).json(salaries);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

// Delete a salary record
router.delete("/deleteSalary/:id", async (req, res) => {
    try {
        const { id } = req.params;
        await Salary.findByIdAndDelete(id);
        res.status(200).json({ message: "Salary deleted successfully" });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

// Get a single salary record by ID
router.get("/getSalary/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const salary = await Salary.findById(id);
        if (!salary) {
            return res.status(404).json({ message: "Salary not found" });
        }
        res.status(200).json(salary);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});


router.get('/salaries/:month', requireAuth, async (req, res) => {
    try {
      const { month } = req.params;
      const salaries = await Salary.find({ Month: month });
      res.status(200).json(salaries);
    } catch (error) {
      console.error('Error fetching salary data by month:', error);
      res.status(500).send('Server Error');
    }
  });

module.exports = router;
