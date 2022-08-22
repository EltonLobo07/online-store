require("dotenv").config();

// Environment variables are now set

const PORT_NUMBER = process.env.PORT_NUMBER;
const DB_URI = process.env.DB_URI;
const SECRET_KEY = process.env.SECRET_KEY;
const PASSWORD_LENGTH = Number(process.env.PASSWORD_LENGTH);
const NAME_LENGTH = Number(process.env.NAME_LENGTH);

module.exports = {PORT_NUMBER, DB_URI, SECRET_KEY, PASSWORD_LENGTH, NAME_LENGTH};
