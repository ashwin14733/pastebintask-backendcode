// require("dotenv").config();

// const app = require("./app");
// const ConnectDB = require("../config/db");

// ConnectDB();

// // const PORT = process.env.PORT || 10000;

// // app.listen(PORT, () => {
// //     console.log(`Server is Successfully running on Port ${PORT}`);
// // })
// module.exports = app;


require("dotenv").config();
const app = require("./app");
const connectDB = require("../config/db");

connectDB();

const PORT = 10000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
