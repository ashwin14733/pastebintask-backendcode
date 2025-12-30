// require("dotenv").config();

// const app = require("../src/index");
// const ConnectDB = require("../config/db");

// ConnectDB();

// module.exports = app;

require("dotenv").config();
const app = require("../src/app");
const connectDB = require("../config/db");

let isConnected = false;

async function handler(req, res) {
  if (!isConnected) {
    await connectDB();
    isConnected = true;
  }
  return app(req, res);
}

module.exports = handler;
