const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const reservationSchema =  new Schema({
    clientName:{
        type:String,
        required:[true, 'Client name is required'],
    },
    clientEmail:{
        type:String,
        required:[true, 'Client email is required'],
        match:[/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email address']
    },
    contactNumber:{
        type:String,
        required:[true, 'Contact number is required'],
        match:[/^0\d{9}$/, 'Please enter a valid 10-digit phone number starting with 0']
    },
    eventType:{
        type:String,
        required:[true, 'Event type is required'],
        enum: [
            "Graduation Ceremony",
            "Award Ceremony",
            "Product Launch Event",
            "Fashion Show",
            "Art Exhibition",
            "Community Fair",
            "Sports Tournament",
            "Cultural Festival",
            "Film Premiere",
            "Trade Show",
            "Music Concert",
            "Dance Performance",
            "Garden Party",
            "Other Event"
        ]
    },
    eventDescription:{
        type:String,
        required:[true, 'Event description is required'],
    },
    eventDate:{
        type:Date,
        required:[true, 'Event date is required'],
        min:[Date.now(), 'Event date cannot be in the past']
    },
    venueLocation:{
        type:String,
        required:[true, 'Venue location is required'],
    },
    receipt:{
        type:String,
        default: 'empty'
    },
    paymentAmount:{
        type:Number,
        required:[true, 'Payment amount is required'],
        min:[0, 'Payment amount cannot be negative'],
        max:[9999999999999, 'Payment amount cannot exceed 9999999999999']
    },
    reservationStatus:{
        type:String,
        default: 'pending',
        enum: ['pending', 'approved', 'cancelled']
    },
    user_id:{
        type:String,
        required:[true, 'User ID is required']
    }
});

const Reservation = mongoose.model("reservation",reservationSchema);

module.exports = Reservation;
