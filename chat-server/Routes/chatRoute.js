const express = require("express")
const {createChat,findUserChats,findChat} = require("../Controllers/chatControllers")
const {chatEndpointLimiter} = require("../Middlewares/rateLimiter");

const router = express.Router();

router.post("/", chatEndpointLimiter, createChat);
router.get("/:userId",findUserChats);
router.get("/find/:firstId/:secondId",findChat);

module.exports = router;
