const axios = require("axios");
const session = require("../services/sessionManager");

class PortalClient {
  constructor() {
    this.client = axios.create({
      baseURL: process.env.BASE_URL,
      timeout: 10000,
    });
  }

  async request(config) {
    if (!session.hasSession()) {
      await session.login();
    }

    config.headers = {
      ...(config.headers || {}),
      Cookie: session.getCookie(),
      Accept: "application/json",
    };

    try {
      return await this.client(config);
    } catch (error) {
      if (error.response) {
        throw new Error(`Portal Error ${error.response.status}`);
      }

      throw error;
    }
  }
}

module.exports = new PortalClient();
