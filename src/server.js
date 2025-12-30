require("dotenv").config();

const app = require("./index");
const ConnectDB = require("../config/db");

ConnectDB();

// const PORT = process.env.PORT || 10000;

// app.listen(PORT, () => {
//     console.log(`Server is Successfully running on Port ${PORT}`);
// })
module.exports = app;