const express = require("express");
const router = express.Router();
const authenticate = require("../middleware/authenticate");
const Business = require("../models/business");
router.get("/me", authenticate, async (req, res) => {
  try {
    const business = await Business.findById(req.user.id).select(
      "businessName"
    );
    if (!business) {
      return res.status(404).json({ message: "Business not found" });
    }
    res.status(200).json({ businessName: business.businessName });
  } catch (error) {
    return res.status(500).json({ message: "Business Name Couldn't be found" });
  }
});
module.exports = router;
