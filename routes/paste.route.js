const express = require("express");
const { nanoid } =require("nanoid");
const Paste = require("../model/paste.model");
const { getNow } = require("../utils/time");

const router = express.Router();

router.post("/", async (req,res) => {
    const { content, ttl_seconds, max_views } = req.body;

    if(!content || typeof content !== "string" || !content.trim()){
        return res.status(400).json({ error: "Invalid content"});
    }
    if(ttl_seconds !== undefined && ttl_seconds < 1 ){
        return res.status(400).json({ error: "Invalid ttl_seconds"});
    }
    if(max_views !== undefined && max_views < 1 ){
        return res.status(400).json({ error: "Invalid max_views"});
    }

    const id = nanoid();
    
    const expiresAt = ttl_seconds ? new Date(Date.now() + ttl_seconds*1000 ) : null;

    await Paste.create({
        _id: id,
        content,
        expiresAt,
        maxViews: max_views ?? null
    })
    res.status(201).json({ id, url: `${process.env.BASE_URL}/p/${id}`})
})


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


module.exports = router;