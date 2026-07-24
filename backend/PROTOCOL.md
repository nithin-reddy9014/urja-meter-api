# PROTOCOL.md

# Urja Meter Ops – Reverse Engineering Notes

## Overview

The Urja Meter Ops portal is a web-based internal application used by utility operators to view smart meter information, hierarchy, location and energy consumption.

The portal does not expose a public REST API. Instead, the web interface internally communicates with several JSON endpoints after authentication.

This project wraps those internal endpoints with a clean REST API.

---

# Authentication

The application uses session-based authentication.

Login page

```
POST /login
```

Form fields

```
email
password
```

Content-Type

```
application/x-www-form-urlencoded
```

After successful authentication the server returns

```
__Secure-better-auth.session_token
```

This cookie is required for all subsequent requests.

The cookie is stored by the SessionManager and attached to every request made by PortalClient.

---

# Portal Endpoints

## Search Meters

```
GET /portal/meters/search?page=1&q=
```

Returns

- list of meters
- pagination
- search results

Example response

```json
{
  "page": 1,
  "pageSize": 20,
  "total": 403,
  "data": []
}
```

---

## Meter Details

The meter page is generated using a SvelteKit data endpoint.

```
GET /meters/{meterId}/__data.json
```

Contains

- Meter ID
- Serial Number
- Make
- Phase Type
- Installation Status
- Installation Type
- Network Hierarchy

Example

```json
{
  "MeterId": "J100009",
  "SerialNo": "SE79541",
  "Make": "Genus"
}
```

---

## Geo Location

```
GET /portal/meters/{meterId}/geo
```

Returns

```json
{
  "latitude": 26.8432866625,
  "longitude": 75.8586705639
}
```

---

## Energy

```
GET /portal/meters/{meterId}/energy
```

Returns recent energy readings.

Includes

- Timestamp
- kWh
- kVAh
- Voltage
- Current
- Power Factor

---

# Data Flow

Browser

↓

Login

↓

Session Cookie

↓

Search Meter

↓

Meter Details

↓

Geo

↓

Energy

---

# API Wrapper

This project exposes a simplified API.

Instead of

3 requests

```
Meter
Geo
Energy
```

clients only call

```
GET /api/meters/{id}
```

The service aggregates all portal responses into a single JSON response.

---

# Authentication Strategy

The legacy portal uses browser-based authentication.

A browser automation step (Playwright) is used to authenticate and obtain a valid session cookie.

Subsequent requests reuse the authenticated cookie through Axios.

---

# Observations

- Portal uses SvelteKit.
- Session authentication is cookie based.
- Internal JSON endpoints are consumed by the frontend.
- Meter information is split across multiple endpoints.
- Hierarchy information is embedded inside the SvelteKit data response.
- Geo coordinates are retrieved through a dedicated endpoint.
- Energy history is retrieved through a dedicated endpoint.

---

# Assumptions

- The authenticated session remains valid for the duration of API requests.
- Portal endpoint URLs remain stable.
- Internal JSON response structure does not change frequently.

---

# Improvements

If more time were available:

- Automatic session renewal
- Response caching
- Retry mechanism
- Rate limiting
- Bulk synchronization
- Persistent local index
- Network hierarchy explorer
