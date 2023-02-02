const mongoose = require("mongoose");

const { Schema } = mongoose;

const TrainingSchema = new Schema([{ title: String, difficulty: String }]);

module.exports = mongoose.model("Training", TrainingSchema);