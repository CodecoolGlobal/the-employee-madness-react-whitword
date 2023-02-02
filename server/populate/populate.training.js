/*
Loading the .env file and creates environment variables from it
*/
require("dotenv").config();
const mongoose = require("mongoose");

const trainingsJson = require("./trainings.json");
const TrainingModel = require("../db/training.model");

const mongoUrl = process.env.MONGO_URL;

if (!mongoUrl) {
  console.error("Missing MONGO_URL environment variable");
  process.exit(1); // exit the current program
}

const pick = (from) => from[Math.floor(Math.random() * (from.length - 0))];
const difficulty = ["beginner", "intermediate", "advanced"]

const populateTraining = async () => {
  await TrainingModel.deleteMany({});

  const trainings = trainingsJson.map((training) => ({
    title: training,
    difficulty: pick(difficulty),
  }));

  await TrainingModel.create(...trainings);
  console.log("Trainings created");
};

const main = async () => {
  await mongoose.connect(mongoUrl);

  await populateTraining();

  await mongoose.disconnect();
};

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
