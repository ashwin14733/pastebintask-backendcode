const express = require("express");
const app = express();
const cors = require("cors");

const healthzRoutes = require("../routes/health.route");
const pastesRoutes = require("../routes/paste.route")
const Paste = require("../model/paste.model");
const { getNow } = require("../utils/time");

const allowedOrigin = "https://pastebin-frontend.netlify.app/"


app.use(express.urlencoded({ extended:true }));
app.use(express.json());
app.use(cors({
    origin : allowedOrigin,
    methods: ["GET","POST","OPTIONS"],
    allowedHeaders : ["Content-Type"]
}));

app.options("*", cors({
    origin : allowedOrigin,
    methods: ["GET","POST","OPTIONS"],
    allowedHeaders : ["Content-Type"]
}))

app.use("/api/healthz", healthzRoutes);
app.use("/api/pastes", pastesRoutes)

app.get("/p/:id", async(req,res) => {
    const paste = await Paste.findById(req.params.id);

    if(!paste) return res.status(400).send("Not found");

    const now = getNow(req);

    if(paste.expiresAt && now > paste.expiresAt){
        return res.status(404).send("Expired");
    }
    if(paste.maxViews !== null && paste.views >= paste.maxViews){
        return res.status(400).send("View limit exceeded");
    }

    res.send(`<pre>${paste.content.replace(/</g,"&lt;")}</pre>`)
})

module.exports = app;