import { MongoClient } from "mongodb";
import cors from "cors";
import express from "express";
import dotenv from "dotenv";
import { env } from "process";
import joi from "joi";
dotenv.config();
const MONGO_CONNECTION_STRING = process.env.MONGO_CONNECTION_STRING;
const app = express();
const port = process.env.PORT;
const mongoClient = new MongoClient(MONGO_CONNECTION_STRING);

app.use(express.json());
app.use(cors());

app.get("/memberships", async (req, res) => {
  const connection = await mongoClient.connect();
  const data = await connection
    .db("Project2")
    .collection("services")
    .find({})
    .toArray();
  res.send(data);
});

app.post("/memberships", async (req, res) => {
  const { id, name, price, description } = req.body;
  const newService = { id, name, price, description };
  const connection = await mongoClient.connect();
  const schema = joi.object({
    id: joi.number().required(),
    name: joi.string().max(50).required(),
    price: joi.number().min(1).required(),
    description: joi.string().max(500).required(),
  });
  const isValid = schema.validate(newService);
  if (isValid.error) {
    res.status(400).send({ error: isValid.error.details[0].message });
  } else {
    res.send({ success: true, service: newService });
    const data = await connection
      .db("Project2")
      .collection("services")
      .insertOne(newService);
  }
});
app.delete("/memberships/:id", async (req, res) => {
  const id = Number(req.params.id);
  const connection = await mongoClient.connect();
  const data = await connection
    .db("Project2")
    .collection("services")
    .deleteOne({ id: id });
  res.send(`Item with ${id} deleted`);
});
app.get("/users/:order", async (req, res) => {
  const order = Number(req.params.order);
  const connection = await mongoClient.connect();
  const data = await connection
    .db("Project2")
    .collection("users")
    .find()
    .sort({ name: order })
    .toArray();
  res.send(data);
});
app.post("/users", async (req, res) => {
  const { id, name, surname, email, service_id } = req.body;
  const newUser = { id, name, surname, email, service_id };
  const schema = joi.object({
    id: joi.number().required().min(1),
    name: joi.string().max(50).required(),
    surname: joi.string().max(50).required(),
    email: joi.string().email().required(),
    service_id: joi.number().required().min(1),
  });
  const isValid = schema.validate(newUser);
  if (isValid.error) {
    res.status(400).send({ error: isValid.error.details[0].message });
  } else {
    res.send({ success: true, user: newUser });
    const connection = await mongoClient.connect();
    const data = await connection
      .db("Project2")
      .collection("users")
      .insertOne(newUser);
  }
});
app.listen(port, () => {
  console.log(`Example app listening at http://localhost/${port}`);
});
