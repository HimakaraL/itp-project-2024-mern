const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const financeSchema = new Schema({
    transactionType: {
        type: String,
        required: true,
        enum: ['income','expense']
    },
    category: {
        type: String,
        required: true,
        enum: ['equipment rental', 'service fee', 'hut rental', 'maintenance fee', 'utility bill', 'transport fee', 'marketing fee', 'Other']
    },
    amount: {
        type: Number,
        required: true,
    },
    date: {
        type: Date,
        required: true,
        default: Date.now,
    },
    paymentMethod: {
        type: String,
        required: true,
        enum: ['card','cash','online payment']
    },
    paymentStatus: {
        type: String,
        required: true,
        enum: ['pending','success']
    },
    description: {
        type: String,
        required: true,
    },
    invoiceImage:{
        type:String,
        default: 'empty'
    },
})

const Finance = mongoose.model("Finance", financeSchema);

module.exports = Finance;