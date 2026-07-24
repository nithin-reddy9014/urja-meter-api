module.exports = (req, res, next) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({
      success: false,
      message: "Meter ID is required",
    });
  }

  if (!/^J\d+$/.test(id)) {
    return res.status(400).json({
      success: false,
      message: "Invalid Meter ID",
    });
  }

  next();
};
