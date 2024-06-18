const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const InventorySchema = new Schema({
    itemName: {
        type: String,
        required: true,
    },
    modelNumber: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        enum: ['Electrical', 'Lighting', 'Sound', 'Stage Equipment'],
        required: true,
    },
    quantityInStock: {
        type: Number,
        required: true,
    },
    unitPrice: {
        type: Number,
        required: true,
    },
    dateAdded: {
        type: Date,
        required: true,
        default: Date.now,  
        get: (date) => date.toISOString().split('T')[0],  
    },
    condition: {
        type: String,
        enum: ['New', 'Used', 'Refurbished'],
        required: true,
    },
    supplier: {
        name: {
            type: String,
            required: true,
        },
        contactNumber: {
            type: String,
            required: true,
        },
    },
    description: {
        type: String,
        required: true,
    },
});

const Inventory = mongoose.model('Inventory', InventorySchema);

module.exports = Inventory;
