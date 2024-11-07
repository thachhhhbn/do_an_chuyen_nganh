const express = require("express");
const router = express.Router();
const homeController = require("../controllers/home.controller");

router.get("/", homeController.index);
router.get("/listModel", homeController.listModel);
router.get("/listModel/:id", homeController.detailModel);
router.get("/detail", homeController.detail);
module.exports = router;