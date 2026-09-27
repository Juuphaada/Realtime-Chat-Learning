require("dotenv").config();

const Redis = require('ioredis');
const {rateLimit} = require('express-rate-limit');
const {RedisStore} = require('rate-limit-redis');
const logger = require('../utils/logger');

const redisClient = new Redis(process.env.REDIS_URL);

redisClient.on("error", (err) => {
    logger.error(`Redis connection error: ${err.message}`);
});

const createLimiter = (maxReq) => {
    return rateLimit({
        windowMs: 15 * 60 * 1000,
        max: maxReq,
        standardHeaders: true,
        legacyHeaders: false,

        handler: (req, res) => {
            logger.warn(
                `Rate limit exceeded for IP: ${req.ip}`
            );

            res.status(429).json({
                success: false,
                message: "Too many requests"
            });
        },

        store: new RedisStore({
            sendCommand: (...args) => redisClient.call(...args),
        }),
    });
};

const userEndpointLimiter = createLimiter(10);
const chatEndpointLimiter = createLimiter(20);
const messageEndpointLimiter = createLimiter(50);


module.exports = {userEndpointLimiter, chatEndpointLimiter, messageEndpointLimiter};