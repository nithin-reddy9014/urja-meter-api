const express = require("express");

const router = express.Router();

const health = require("../controllers/health.controller");

/**
 * @swagger
 * /api/health:
 *   get:
 *     summary: Health Check
 *     tags:
 *       - Health
 *     responses:
 *       200:
 *         description: Service Health
 */

router.get("/", health.health);

module.exports = router;
