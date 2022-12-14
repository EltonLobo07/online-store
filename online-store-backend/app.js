const express = require("express");
const userRouter = require("./controllers/users");
const loginRouter = require("./controllers/login");
const productRouter = require("./controllers/products");
const orderRouter = require("./controllers/orders");
const categoryRouter = require("./controllers/categories");
const logger = require("./utils/logger");
const { DB_URI } = require("./utils/config");
const mongoose = require("mongoose");
const { unknownEndpointHandler, errorHandler, requestLogger } = require("./utils/middlewares");
const cors = require("cors");
const path = require("path");

// Connect to your DB here
mongoose.connect(DB_URI)
        .then(() => console.log("Connected to the DB succesfully"))
        .catch(err => logger.error(err));

const app = express();

app.use(cors({origin: "*"}));

app.use(express.json()); // Sets request's body field to received JS object

// app.use(requestLogger);

app.use(express.static("public"));

app.use("/api/users", userRouter);

app.use("/api/login", loginRouter);

app.use("/api/products", productRouter);

app.use("/api/orders", orderRouter);

app.use("/api/categories", categoryRouter);

// For react router routes to work properly (redirects all get requests to index.html)
if (process.env.NODE_ENV === "production") {
        app.get("*", (req, res) => {
                res.sendFile(path.resolve(__dirname, "public", "index.html"));
        });
}

/*
app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "public", "index.html"));
});
*/

app.use(unknownEndpointHandler);

app.use(errorHandler);

module.exports = app;
