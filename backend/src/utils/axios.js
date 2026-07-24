const axios = require("axios");
const { CookieJar } = require("tough-cookie");
const { wrapper } = require("axios-cookiejar-support");

const cookieJar = new CookieJar();

const client = wrapper(
  axios.create({
    baseURL: process.env.BASE_URL,
    jar: cookieJar,
    withCredentials: true,
    maxRedirects: 0,
    validateStatus: () => true,
  }),
);

module.exports = {
  client,
  cookieJar,
};
