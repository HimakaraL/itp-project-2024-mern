const mongoose = require ('mongoose');

const Schema = mongoose.Schema;

const feedbackSchema = new Schema({


name: {
    type : String,
    required :  true
},

email: {
    type : String,
    required : true
},

rating:{
    type : String,
    required : true
},

service: {
    type : String,
    required : true
},

feedback : {
    type : String,
    required : true
},

date: {
    type: Date,
    default: Date.now
},
user_id:{
    type:String,
    required:true
}

})

const Feedback = mongoose.model("Feedback", feedbackSchema);

module.exports = Feedback;


 
