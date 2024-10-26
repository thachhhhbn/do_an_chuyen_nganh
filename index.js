//
const express = require("express");
const app = express();
const pug = require("pug");
const router = require("./routes/index.router");
const path = require("path");
//end
//
app.set("views", "views");
app.set("view engine", "pug");
app.use(express.static("public"));
//end
//
router(app);
app.listen(3000);
//end
