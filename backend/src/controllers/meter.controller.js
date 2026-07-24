const meterService = require("../services/meter.service");

exports.search = async (req, res) => {
  try {
    const page = req.query.page || 1;
    const q = req.query.q || "";

    const data = await meterService.search(page, q);

    res.json(data);
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

exports.getMeter = async (req, res) => {
  try {
    const data = await meterService.getMeter(req.params.id);

    res.json({
      success: true,
      data,
    });
  } catch (err) {
    next(err);
  }
};
