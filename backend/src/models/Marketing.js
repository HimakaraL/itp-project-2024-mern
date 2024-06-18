const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MarketingSchema = new Schema({
  expenseDate: {
    type: Date,
    required: true,
  },

  expenseCategory: {
    type: String,
    required: true,
  },
  expenseDescription: {
    type: String,
    required: true,
  },
  expenseAmount: {
    type: String,
    required: true,
  },
  expenseDuedate: {
    type: Date,
    required: true,
  },
});

const Marketing = mongoose.model("Marketing", MarketingSchema);

module.exports = Marketing;
