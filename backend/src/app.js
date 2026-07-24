// Import Express
const express = require("express");

// Import CORS middleware
const cors = require("cors");

// Import cookie parser
const cookieParser = require("cookie-parser");

const authRoutes = require("./routes/auth.routes");

const meterRoutes = require("./routes/meter.routes");

const errorHandler = require("./middleware/errorHandler");

const swaggerUI = require("swagger-ui-express");
const swaggerSpec = require("./docs/swagger");

// Create Express application
const app = express();

// Enable CORS
app.use(cors());

// Parse incoming JSON
app.use(express.json());

// Parse cookies
app.use(cookieParser());

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
*/

// Home route
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Welcome to the Flock Energy API",
  });
});

// Health check
app.get("/health", (req, res) => {
  res.json({
    status: "OK",
    uptime: process.uptime(),
    timestamp: new Date(),
  });
});

// Auth routes
app.use("/api/auth", authRoutes);

// Meter routes
app.use("/api/meters", meterRoutes);

app.use(errorHandler);

app.use("/api/health", require("./routes/health.routes"));

app.use("/api/docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec));

// Export app
module.exports = app;
