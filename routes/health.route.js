const express = require("express");
const mongoose = require("mongoose");

const router = express.Router();

router.get("/", async(req,res) => {
    res.json("Welcome to the Pastebin Task...");
    // try {
    //     await mongoose.connection.db.admin().ping();
    //     res.status(200).json({ ok: true });
    // } catch (err) {
    //     res.status(500).json({ ok: false });
    // }
})

module.exports = router;



// const express = require("express");
// const mongoose = require("mongoose");

// const router = express.Router();

// router.get("/", async (req, res) => {
//   try {
//     await mongoose.connection.db.admin().ping();
//     res.status(200).json({
//       message: "Pastebin Backend is running",
//       database: "connected"
//     });
//   } catch (error) {
//     res.status(500).json({
//       message: "Pastebin Backend is running",
//       database: "disconnected"
//     });
//   }
// });

// module.exports = router;
