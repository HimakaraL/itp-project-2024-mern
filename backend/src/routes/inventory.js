const express = require('express');
const Inventory = require('../models/inventory'); 
const router = express.Router();


router.post('/', async (req, res) => {
    try {
        const { itemName, modelNumber, category, quantityInStock, unitPrice, dateAdded, condition, supplier, description } = req.body;

        if (!itemName || !modelNumber || !category || !quantityInStock || !unitPrice || !dateAdded || !condition || !supplier || !description) {
            return res.status(400).send({ message: 'Please provide all required fields' });
        }

        const newInventory = await Inventory.create({
            itemName,
            modelNumber,
            category,
            quantityInStock,
            unitPrice,
            dateAdded,
            condition,
            supplier,
            description,
        });

        return res.status(201).send(newInventory);
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
});

// Route for Get All inventories from database
router.get('/', async (req, res) => {
    try {
        const inventory = await Inventory.find({});

        return res.status(200).json({
            count: inventory.length,
            data: inventory,
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
});

// Route for Get One Inventory from database by id
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const inventory = await Inventory.findById(id);

        if (!inventory) {
            return res.status(404).json({ message: 'Inventory not found' });
        }

        return res.status(200).json(inventory);
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
});

// Route for Update an Inventory
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const updatedData = req.body;

        if (Object.keys(updatedData).length === 0) {
            return res.status(400).send({ message: 'No fields to update' });
        }

        const updatedInventory = await Inventory.findByIdAndUpdate(id, updatedData, { new: true });

        if (!updatedInventory) {
            return res.status(404).json({ message: 'Inventory not found' });
        }

        return res.status(200).json({ message: 'Inventory updated successfully', data: updatedInventory });
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
});

// Route for Delete an inventory
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const deletedInventory = await Inventory.findByIdAndDelete(id);

        if (!deletedInventory) {
            return res.status(404).json({ message: 'Inventory not found' });
        }

        return res.status(200).json({ message: 'Inventory deleted successfully' });
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
});

module.exports = router;
