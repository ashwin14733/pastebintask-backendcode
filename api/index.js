// require("dotenv").config();

// const app = require("../src/index");
// const ConnectDB = require("../config/db");

// ConnectDB();

// module.exports = app;


router.get("/:id", async (req, res) => {
  try {
    const paste = await Paste.findById(req.params.id);
    if (!paste) return res.status(404).json({ error: "Not found" });

    const now = getNow(req);
    if (paste.expiresAt && now > paste.expiresAt) return res.status(404).json({ error: "Expired" });
    if (paste.maxViews !== null && paste.views >= paste.maxViews) return res.status(404).json({ error: "View limit exceeded" });

    paste.views += 1;
    await paste.save();

    res.status(200).json({
      content: paste.content,
      remaining_views: paste.maxViews !== null ? paste.maxViews - paste.views : null,
      expiresAt: paste.expiresAt
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
