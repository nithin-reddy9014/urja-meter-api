const express = require("express");

const router = express.Router();

const meterController = require("../controllers/meter.controller");

const validateMeter = require("../middleware/validateMeter");

/**
 * @swagger
 * /api/meters:
 *   get:
 *     summary: Search meters
 *     tags:
 *       - Meters
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *       - in: query
 *         name: q
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of meters
 */

router.get("/", meterController.search);

/**
 * @swagger
 * /api/meters/{id}:
 *   get:
 *     summary: Get meter details
 *     tags:
 *       - Meters
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Meter information
 */

router.get("/:id", validateMeter, meterController.getMeter);

module.exports = router;
