class SessionManager {
  constructor() {
    this.cookie = null;
  }

  save(cookie) {
    this.cookie = cookie;
  }

  get() {
    return this.cookie;
  }

  hasSession() {
    return this.cookie !== null;
  }

  clear() {
    this.cookie = null;
  }
}

module.exports = new SessionManager();
