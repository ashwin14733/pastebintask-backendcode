require("dotenv").config();

const app = require("../src/index");
const ConnectDB = require("../config/db");

ConnectDB();

module.exports = app;

