const { chromium } = require("playwright");

class SessionManager {
  constructor() {
    this.browser = null;
    this.context = null;
    this.page = null;
    this.cookie = null;
  }

  async login() {
    this.browser = await chromium.launch({
      headless: false, // IMPORTANT: open the browser
    });

    this.context = await this.browser.newContext();

    this.page = await this.context.newPage();

    await this.page.goto(`${process.env.BASE_URL}/login`);

    console.log("Current URL:", this.page.url());

    // Take screenshot before login
    await this.page.screenshot({ path: "before-login.png" });

    await this.page.fill('input[name="email"]', process.env.EMAIL);
    await this.page.fill('input[name="password"]', process.env.PASSWORD);

    await this.page.click('button[type="submit"]');

    // Wait 5 seconds
    await this.page.waitForTimeout(5000);

    console.log("After Login URL:", this.page.url());

    // Take screenshot after login
    await this.page.screenshot({ path: "after-login.png" });

    const cookies = await this.context.cookies();

    console.log("Cookies:");
    console.log(cookies);

    if (cookies.length === 0) {
      throw new Error("No cookies were stored");
    }

    const sessionCookie = cookies.find(
      (c) => c.name === "__Secure-better-auth.session_token",
    );

    if (!sessionCookie) {
      throw new Error("Session cookie not found");
    }

    this.cookie = `${sessionCookie.name}=${sessionCookie.value}`;
  }

  getCookie() {
    return this.cookie;
  }

  hasSession() {
    return !!this.cookie;
  }
}

module.exports = new SessionManager();
