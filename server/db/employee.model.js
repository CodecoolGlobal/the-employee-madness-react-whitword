// https://mongoosejs.com/
const mongoose = require("mongoose");

const { Schema } = mongoose;

const EmployeeSchema = new Schema({
  name: String,
  level: String,
  position: String,
  current_salary: {
    type: Number,
    default: 0
  },
  desired_salary: {
    type: Number,
    default: 0
  },
  present: false,
  starting_date: {
    type: Date,
    default: Date.now,
  },
  fav_color: String,
  created: {
    type: Date,
    default: Date.now,
  },
  notes: [{type: String}]
  });

module.exports = mongoose.model("Employee", EmployeeSchema);
