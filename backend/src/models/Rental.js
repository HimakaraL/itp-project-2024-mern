const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const rentSchema =  new Schema({
    equipment:{
        type:String,
        required:true
    },
    supName:{
        type:String,
        required:true
    },
    quantity:{
        type:Number,
        required:true
    },
    startDate:{
        type:Date,
        required:true
    },
    endDate:{
        type:Date,
        required:true
    },
    cost:{
        type:Number,
        required:true
    },
    status:{
        type:String,
        required:true
    }
});

const Rental = mongoose.model("rental",rentSchema);

module.exports = Rental;