const express = require("express");
const app = express();
const pug = require("pug");
//const mongoose = require("mongoose");
require("dotenv").config();
//const database = require("./config/database");
const router = require("./routes/index.router");

const port = process.env.PORT || 3000;
app.set("views", `${__dirname}/views`);
app.set("view engine", "pug");
app.use(express.static(`${__dirname}/public`));

// database.connect();
router(app);

app.listen(3000);
console.log("http://localhost:" + port);
