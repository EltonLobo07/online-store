const express = require("express");
const testRouter = require("./controllers/test");

const app = express();

app.use(express.json()); // Sets request's body field to received JS object

app.use("/api/test", testRouter);

module.exports = app;
