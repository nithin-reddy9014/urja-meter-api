// Load environment variables
require("dotenv").config();

// Import app
const app = require("./app");

// Read PORT from .env
const PORT = process.env.PORT || 3000;

// Start server
app.listen(PORT, () => {
  console.log("=================================");
  console.log(`🚀 Server is running`);
  console.log(`🌐 http://localhost:${PORT}`);
  console.log("=================================");
});
