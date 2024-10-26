const express = require("express");
const router = express.Router();
const homeController = require("../controllers/home.controller");

router.get("/", homeController.index);
router.get("/listStudent", homeController.listStudent);
router.get("/ipPlanning", homeController.ipPlanning);

module.exports = router;