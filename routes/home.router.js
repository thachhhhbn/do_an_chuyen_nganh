const express = require("express");
const router = express.Router();
const homeController = require("../controllers/home.controller");

router.get("/", homeController.index);
router.get("/cidr", homeController.cidr);
router.get("/vlsm", homeController.vlsm);

// router.get("/listModel", homeController.listModel);
// router.get("/listModel/:id", homeController.detailModel);
// router.get("/explainTool", homeController.explainTool);

module.exports = router;




