const express = require("express");
const controller = require("./controller");
const authentication = require("../../middleware/authentication");

const router = express.Router();

// create
router.post("/", authentication, controller.create);

// get all
router.get("/", controller.getAll);

// get by id
router.get("/:homeImageId", controller.getById);

// update
router.put("/:homeImageId", authentication, controller.updateById);

// remove
router.delete("/:homeImageId", authentication, controller.remove);

module.exports = router;
