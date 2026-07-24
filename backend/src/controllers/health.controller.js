exports.health = (req, res) => {
  res.json({
    success: true,

    service: "Urja API",

    status: "Healthy",

    uptime: process.uptime(),
  });
};
