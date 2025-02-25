const express = require("express");
const controller = require("./controller");
const authentication = require("../../middleware/authentication");

const router = express.Router();

// create
router.post("/", controller.create);

// get all
router.get("/", authentication, controller.getMany);

router.get("/all", authentication, controller.getAll);

// get by id
router.get("/:contactUsId", authentication, controller.getById);

// update
router.put("/:contactUsId", authentication, controller.update);

// remove
router.delete("/:contactUsId", authentication, controller.remove);

module.exports = router;
