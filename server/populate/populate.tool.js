/*
Loading the .env file and creates environment variables from it
*/
require("dotenv").config();
const mongoose = require("mongoose");

const toolsJson = require("./tools.json");
const ToolModel = require("../db/tool.model");

const mongoUrl = process.env.MONGO_URL;

if (!mongoUrl) {
  console.error("Missing MONGO_URL environment variable");
  process.exit(1); // exit the current program
}

const populateTools = async () => {
  await ToolModel.deleteMany({});

  const tools = toolsJson.map((tool) => ({
    name: tool.name,
    weight: tool.weight,
  }));

  await ToolModel.create(...tools);
  console.log("Tools created");
};

const main = async () => {
  await mongoose.connect(mongoUrl);

  await populateTools();

  await mongoose.disconnect();
};

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
