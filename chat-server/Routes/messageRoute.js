const express = require("express");
const { createMessage, getMessages } = require("../Controllers/messageController");
const {messageEndpointLimiter} = require("../Middlewares/rateLimiter.js");

const router = express.Router();

router.post("/", messageEndpointLimiter, createMessage);
router.get("/:chatId",getMessages);

module.exports = router;
