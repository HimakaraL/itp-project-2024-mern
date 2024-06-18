const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ServiceSchema = new Schema({
    sname: {
        type: String,
        required: true
    },

    availability: {
        type: Number,
        required: true
    },

    type: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },

    status: {
        type: String,
        required: true
    },

    icon: {
        type: String,
        required: true
    }
})

const Service = mongoose.model("Service", ServiceSchema);

module.exports = Service;