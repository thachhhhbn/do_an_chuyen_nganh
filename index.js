const express = require("express");
const app = express();
const pug = require("pug");
const mongoose = require("mongoose");
require("dotenv").config();
const database = require("./config/database");
const router = require("./routes/index.router");
const port = process.env.PORT;

app.set("views", "views");
app.set("view engine", "pug");
app.use(express.static("public"));

database.connect();


router(app);
app.listen(3000);
