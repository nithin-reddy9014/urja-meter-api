const swaggerJsDoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.3",
    info: {
      title: "Urja Meter API",
      version: "1.0.0",
      description:
        "REST API built over the legacy Urja Meter Operations portal.",
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
  },
  apis: ["./src/routes/*.js"],
};

module.exports = swaggerJsDoc(options);
