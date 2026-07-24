const express = require("express");

const router = express.Router();

const authController = require("../controllers/auth.controller");

const session = require("../middleware/session");

/**
 * @swagger
 * /api/auth/login:
 *   get:
 *     summary: Authenticate with Urja Portal
 *     tags:
 *       - Authentication
 *     responses:
 *       200:
 *         description: Authentication successful
 */

router.get("/login", authController.login);

router.get("/session", (req, res) => {
  res.json({
    hasSession: session.hasSession(),

    cookie: session.get(),
  });
});

module.exports = router;
