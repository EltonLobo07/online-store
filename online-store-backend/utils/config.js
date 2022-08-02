require("dotenv").config();

// Environment variables are now set

const PORT_NUMBER = process.env.PORT_NUMBER;
const DB_URI = process.env.DB_URI;

module.exports = {PORT_NUMBER, DB_URI};
