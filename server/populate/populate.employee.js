/*
Loading the .env file and creates environment variables from it
*/
require("dotenv").config();
const mongoose = require("mongoose");
const names = require("./names.json");
const levels = require("./levels.json");
const colors = require("./colors.json");
const positions = require("./positions.json");
const trainings = require("./trainings.json");
const EmployeeModel = require("../db/employee.model");

const mongoUrl = process.env.MONGO_URL;

if (!mongoUrl) {
  console.error("Missing MONGO_URL environment variable");
  process.exit(1); // exit the current program
}

const pick = (from) => from[Math.floor(Math.random() * (from.length - 0))];

const populateEmployees = async () => {
  await EmployeeModel.deleteMany({});
  const randomPresent = [true, false];
  const difficulty = ["beginner", "intermediate", "advanced"]

  const employees = names.map((name) => ({
    name,
    level: pick(levels),
    position: pick(positions),
    current_salary: Math.floor(Math.random() * (3500 - 2000) + 2000),
    desired_salary: Math.floor(Math.random() * (7500 - 4000) + 4000),
    present: pick(randomPresent),
    starting_date: new Date((Math.floor(Math.random() * (2022 - 1990) + 1990)), (Math.floor(Math.random() * (12 - 1) + 1)), 2),
    fav_color: pick(colors),
    trainings: [{title:pick(trainings), difficulty: pick(difficulty)}],
    equipments: [],
    kittens: [],
    notes: []
  }));

  await EmployeeModel.create(...employees);
  console.log("Employees created");
};

const main = async () => {
  await mongoose.connect(mongoUrl);

  await populateEmployees();

  await mongoose.disconnect();
};

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
