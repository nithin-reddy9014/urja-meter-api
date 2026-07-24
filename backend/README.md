# Urja Meter API

A clean REST API built on top of the legacy **Urja Meter Ops** web portal.

Instead of interacting directly with the portal UI, consumers can use this API to search meters, retrieve meter information, fetch geo-location data, and access energy readings.

---

# Features

- Reverse engineered the legacy web portal
- Browser-based authentication using Playwright
- Session cookie management
- Clean REST API
- Meter search
- Meter details
- Geo location
- Energy readings
- Swagger UI
- OpenAPI Specification
- Health endpoint
- Structured error handling
- Request logging

---

# Tech Stack

- Node.js
- Express.js
- Axios
- Playwright
- Swagger UI
- swagger-jsdoc

---

# Project Structure

```

src/
│
├── controllers/
│
├── routes/
│
├── services/
│
├── middleware/
│
├── utils/
│
├── docs/
│
├── app.js
└── server.js
```
