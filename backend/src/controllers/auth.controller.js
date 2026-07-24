const session = require("../services/sessionManager");

exports.login = async (req, res) => {
  try {
    await session.login();

    res.json({
      success: true,

      session: session.getCookie(),
    });
  } catch (error) {
    res.status(500).json({
      success: false,

      message: error.message,
    });
  }
};
