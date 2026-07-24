const session = require("../middleware/session");

const querystring = require("querystring");
const { client, cookieJar } = require("../utils/axios");

class FlockService {
  async login() {
    const body = querystring.stringify({
      email: process.env.EMAIL,
      password: process.env.PASSWORD,
    });

    const response = await client.post("/login", body, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Accept: "application/json",
        "X-SvelteKit-Action": "true",
      },
    });

    console.log("Status:", response.status);
    console.log("Response:", response.data);

    const cookies = await cookieJar.getCookies(process.env.BASE_URL);

    console.log("\nStored Cookies:");
    console.log(cookies);

    const token = cookies.find(
      (cookie) => cookie.key === "__Secure-better-auth.session_token",
    );

    if (token) {
      session.save(token.cookieString());
    }

    return {
      loginResponse: response.data,

      sessionStored: session.hasSession(),
    };
  }
}

module.exports = new FlockService();
