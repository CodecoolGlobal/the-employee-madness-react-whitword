const mongoose = require("mongoose");

const { Schema } = mongoose;

const TrainingSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  difficulty: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("Training", TrainingSchema);