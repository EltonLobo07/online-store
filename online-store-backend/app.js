const express = require("express");
const testRouter = require("./controllers/test");
const logger = require("./utils/logger");
const { DB_URI } = require("./utils/config");
const mongoose = require("mongoose");

// Connect to your DB here
mongoose.connect(DB_URI)
        .then(() => console.log("Connected to the DB succesfully"))
        .catch(err => logger.error(err));

const app = express();

app.use(express.json()); // Sets request's body field to received JS object

app.use("/api/test", testRouter);

module.exports = app;
