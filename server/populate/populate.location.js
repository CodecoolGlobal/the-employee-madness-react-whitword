require("dotenv").config();
const mongoose = require("mongoose");
const LocationModel = require("../db/location.model");

// const trainingsJson = require("./trainings.json");
// const TrainingModel = require("../db/training.model");

const mongoUrl = process.env.MONGO_URL;

if (!mongoUrl) {
  console.error("Missing MONGO_URL environment variable");
  process.exit(1); // exit the current program
}


const populateLocation = async () => {
    await LocationModel.deleteMany({});
  
    const locations = [{
        "city": "Budapest",
        "country": "Hungary"
        },
        {
        "city": "Debrecen",
        "country": "Hungary"
        },
        {
        "city": "Bratislava",
        "country": "Slovakia"
        }]
        
  
    await LocationModel.create([...locations]);
    console.log("locations created");
  };
  
  const main = async () => {
    await mongoose.connect(mongoUrl);
  
    await populateLocation();
  
    await mongoose.disconnect();
  };
  
  main().catch((error) => {
    console.error(error);
    process.exit(1);
  });
  