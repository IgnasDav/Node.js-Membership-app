import { MongoClient } from "mongodb";
import cors from "cors";
import express from "express";
import dotenv from "dotenv";
import { env } from "process";
import joi from "joi";
import shortUUID from "short-uuid";

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
  const schema = joi.object({
    id: joi.required(),
    name: joi.string().max(50).required(),
    price: joi.number().min(1).required(),
    description: joi.string().max(500).required(),
  });
  const id = shortUUID.generate();
  const { name, price, description } = req.body;
  const newService = { id, name, price, description };
  const connection = await mongoClient.connect();
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
  const id = req.params.id;
  const connection = await mongoClient.connect();
  const data = await connection
    .db("Project2")
    .collection("services")
    .deleteOne({ id: id });
  res.send(data);
});
app.get("/users", async (req, res) => {
  let nameSort = 1;

  if (req.query.nameSort) {
    nameSort = req.query.nameSort === "asc" ? 1 : -1;
  }
  const order = Number(req.params.order);
  const connection = await mongoClient.connect();
  const data = await connection
    .db("Project2")
    .collection("users")
    .aggregate([
      {
        $lookup: {
          from: "services",
          localField: "service_id",
          foreignField: "id",
          as: "memberships",
        },
      },
      {
        $sort: {
          name: nameSort,
        },
      },
    ])
    .toArray();
  res.send(data);
});
app.post("/users", async (req, res) => {
  const id = shortUUID.generate();
  const { name, surname, email, service_id } = req.body;
  const newUser = { id, name, surname, email, service_id };
  const schema = joi.object({
    id: joi.required(),
    name: joi.string().max(50).required(),
    surname: joi.string().max(50).required(),
    email: joi.string().email().required(),
    service_id: joi.required(),
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
