const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const salarySchema = new Schema({
    Name: {
        type: String,
        required: true,
    },
    Eid: {
        type: String,
        required: true,
    },
    Nic: {
        type: String,
        required: true,
    },
    JobPosition: {
        type: String,
        required: true,
    },
    Month: {
        type: String,
        required: true,
    },
    OtRate: {
        type: Number,
        required: true,
    },
    OtHours: {
        type: Number,
        required: true,
    },
    BasicSalary: {
        type: Number,
        required: true,
    },
    NetSalary: {
        type: Number,
    }
});

const Salary = mongoose.model('Salary', salarySchema);

module.exports = Salary;
