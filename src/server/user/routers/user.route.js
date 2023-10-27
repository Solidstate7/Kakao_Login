const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");

// router.get("/");
// router.get("/:id");
// router.post("/");
// router.put("/:id");
// router.delete("/:id");

router.post("/token", userController.provideToken);

module.exports = router;
