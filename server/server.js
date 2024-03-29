require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const EmployeeModel = require("./db/employee.model");
const EquipmentModel = require("./db/equipment.model");
const TrainingModel = require("./db/training.model");
const KittenModel = require("./db/kitten.model");
const ToolModel = require("./db/tool.model");
const DivisionModel = require("./db/division.model");
const LocationModel = require("./db/location.model");

const { MONGO_URL, PORT = 8080 } = process.env;

if (!MONGO_URL) {
  console.error("Missing MONGO_URL environment variable");
  process.exit(1);
}

const app = express();

app.use(express.json());

app.use("/api/employees/:id", async (req, res, next) => {
  let employee = null;

  try {
    employee = await EmployeeModel.findById(req.params.id);
  } catch (err) {
    return next(err);
  }

  if (!employee) {
    return res.status(404).end("Employee not found");
  }

  req.employee = employee;
  next();
});

app.get("/api/employees/", async (req, res) => {
  const employees = await EmployeeModel.find().sort({ created: "desc" });
  return res.json(employees);
});

app.get("/robert/", async (req, res) => {
  const employees = await EmployeeModel.find({name: { $regex: "robert", $options: 'i'}});
  return res.json(employees)
});

app.get("/api/employees/:id", (req, res) => {
  return res.json(req.employee);
});

app.post("/api/employees/", async (req, res, next) => {
  const employee = req.body;

  try {
    const saved = await EmployeeModel.create(employee);
    return res.json(saved);
  } catch (err) {
    return next(err);
  }
});

app.patch("/api/employees/:id", async (req, res, next) => {
  const employee = req.body;
  console.log("PATCH");
  console.log(employee)

  try {
    console.log(req.employee)
    const updated = await req.employee.set(employee).save();
    if (employee.division !== req.employee.division) {
    const division = await DivisionModel.findById(req.employee.division);
    await division.set(division.employees = [...division.employees, req.employee._id] ).save();}
    return res.json(updated);
  } catch (err) {
    return next(err);
  }
});

app.delete("/api/employees/:id", async (req, res, next) => {
  try {
    const deleted = await req.employee.delete();
    return res.json(deleted);
  } catch (err) {
    return next(err);
  }
});

app.use("/api/equipments/:id", async (req, res, next) => {
  let equipment = null;

  try {
    equipment = await EquipmentModel.findById(req.params.id);
  } catch (err) {
    return next(err);
  }

  if (!equipment) {
    return res.status(404).end("Equipment not found");
  }

  req.equipment = equipment;
  next();
});

app.get("/api/equipments/", async (req, res) => {
  const equipments = await EquipmentModel.find().sort({ created: "desc" });
  return res.json(equipments);
});

app.get("/api/equipments/:id", (req, res) => {
  return res.json(req.equipment);
});

app.post("/api/equipments/", async (req, res, next) => {
  const equipment = req.body;

  try {
    const saved = await EquipmentModel.create(equipment);
    return res.json(saved);
  } catch (err) {
    return next(err);
  }
});

app.patch("/api/equipments/:id", async (req, res, next) => {
  const equipment = req.body;

  try {
    const updated = await req.equipment.set(equipment).save();
    return res.json(updated);
  } catch (err) {
    return next(err);
  }
});

app.delete("/api/equipments/:id", async (req, res, next) => {
  try {
    const deleted = await req.equipment.delete();
    return res.json(deleted);
  } catch (err) {
    return next(err);
  }
});

app.get("/api/trainings/", async (req, res) => {
  const trainings = await TrainingModel.find();
  return res.json(trainings);
});

app.post("/api/trainings/", async (req, res, next) => {
  const training = req.body;

  try {
    const saved = await TrainingModel.create(training);
    return res.json(saved);
  } catch (err) {
    return next(err);
  }
});

app.get("/api/kittens/", async (req, res) => {
  const kittens = await KittenModel.find();
  return res.json(kittens);
});

app.post("/api/kittens/", async (req, res, next) => {
  const kitten = req.body;

  try {
    const saved = await KittenModel.create(kitten);
    return res.json(saved);
  } catch (err) {
    return next(err);
  }
});

app.get("/tools/", async (req, res) => {
  const tools = await ToolModel.find();
  return res.json(tools);
});

app.post("/tools/", async (req, res, next) => {
  const tool = req.body;

  try {
    const saved = await ToolModel.create(tool);
    return res.json(saved);
  } catch (err) {
    return next(err);
  }
});

app.use("/divisions/:id", async (req, res, next) => {
  let division = null;

  try {
    division = await DivisionModel.findById(req.params.id);
  } catch (err) {
    return next(err);
  }

  if (!division) {
    return res.status(404).end("Division not found");
  }

  req.division = division;
  next();
});

app.get("/divisions/", async (req, res) => {
  const divisions = await DivisionModel.find();
  return res.json(divisions);
});

app.post("/divisions/", async (req, res, next) => {
  const division = req.body;

  try {
    const saved = await DivisionModel.create(division);
    return res.json(saved);
  } catch (err) {
    return next(err);
  }
});

app.delete("/divisions/:id", async (req, res) => {
  try {
    await req.division.delete();
    res.status(204).send()
  } catch (err) {
    return next(err);
  }
}
)

app.patch("/divisions/:id", async (req, res, next) => {
  const division = req.body;

  try {
    const updated = await req.division.set(division).save();
    return res.json(updated);
  } catch (err) {
    return next(err);
  }
});

app.get("/locations/", async (req, res) => {
  const locations = await LocationModel.find();
  return res.json(locations)
});

app.post("/locations/", async (req, res, next) => {
  const location = req.body;

  try {
    const saved = await LocationModel.create(location);
    return res.json(saved);
  } catch (err) {
    return next(err);
  }
});

const main = async () => {
  await mongoose.connect(MONGO_URL);

  app.listen(PORT, () => {
    console.log("App is listening on 8080");
    console.log("Try /api/employees route right now");
  });
};

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
