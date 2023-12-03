const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");

router.get("/", authController.renderMainPage);

router.get("/auth/kakao/login", authController.loginKakao);

router.get("/auth/kakao/callback", authController.callbackKakao);

router.get("/auth/logout", authController.logout);

module.exports = router;
