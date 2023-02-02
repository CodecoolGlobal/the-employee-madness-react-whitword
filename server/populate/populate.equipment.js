/*
Loading the .env file and creates environment variables from it
*/
require("dotenv").config();
const mongoose = require("mongoose");

const equipmentsJson = require("./equipments.json");
const EquipmentModel = require("../db/equipment.model");

const mongoUrl = process.env.MONGO_URL;

if (!mongoUrl) {
  console.error("Missing MONGO_URL environment variable");
  process.exit(1); // exit the current program
}

const populateEquipments = async () => {
  await EquipmentModel.deleteMany({});

  const equipments = equipmentsJson.map((equipment) => ({
    name: equipment.name,
    type: equipment.type,
    amount: Math.floor(Math.random() * (25 - 1) + 1) //randomNumber between 1 and 25
  }));

  await EquipmentModel.create(...equipments);
  console.log("Equipments created");
};

const main = async () => {
  await mongoose.connect(mongoUrl);

  await populateEquipments();

  await mongoose.disconnect();
};

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
