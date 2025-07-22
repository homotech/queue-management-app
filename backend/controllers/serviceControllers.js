const service = require("../models/service");
const Service = require("../models/service");

exports.createServices = async (req, res) => {
  const { name, price, duration } = req.body;
  const businessId = req.user.id;
  try {
    const newService = await Service.create({
      businessId,
      name,
      price,
      duration,
    });
    res.status(201).json({
      message: "Service has been created successfully",
      service: newService,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "We are checking why, just a minute please" });
  }
};
exports.getServices = async (req, res) => {
  const businessId = req.user.id;
  try {
    const services = await Service.find({ businessId });
    if (services.length === 0) {
      return res.status(404).json({
        message:
          "Hmmm, that's weird, you don't have any services yet, create one now!",
      });
    }
    res.status(200).json({ services });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "We are checking why, just a minute please" });
  }
};

exports.editServices = async (req, res) => {
  const { id } = req.params;
  const { name, price, duration } = req.body;

  try {
    const updated = await Service.findOneAndUpdate(
      {
        _id: id,
        businessId: req.user.id,
      },
      { name, price, duration },
      { new: true }
    );
    if (!updated) {
      return res.status(404).json({ message: "Service not found" });
    }
    return res
      .status(200)
      .json({ message: "Updated!!! Purrr", service: updated });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "We are checking why, just a minute please" });
  }
};
exports.deleteServices = async (req, res) => {
  const { id } = req.params;

  try {
    const service = await Service.findOneAndDelete({
      _id: id,
      businessId: req.user.id,
    });
    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }
    res.status(200).json({ message: "Gone, poof" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "We are checking why, just a minute please" });
  }
};
