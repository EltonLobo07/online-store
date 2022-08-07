const express = require("express");
const userRouter = require("./controllers/users");
const loginRouter = require("./controllers/login");
const productRouter = require("./controllers/products");
const orderRouter = require("./controllers/orders");
const logger = require("./utils/logger");
const { DB_URI } = require("./utils/config");
const mongoose = require("mongoose");
const { unknownEndpointMiddleware, errorHandlingMiddleware, requestLoggerMiddleware } = require("./utils/middlewares");

// Connect to your DB here
mongoose.connect(DB_URI)
        .then(() => console.log("Connected to the DB succesfully"))
        .catch(err => logger.error(err));

const app = express();

app.use(express.json()); // Sets request's body field to received JS object

app.use(requestLoggerMiddleware);

app.use("/api/users", userRouter);

app.use("/api/login", loginRouter);

app.use("/api/products", productRouter);

app.use("/api/orders", orderRouter);

app.use(unknownEndpointMiddleware);

app.use(errorHandlingMiddleware);

module.exports = app;
