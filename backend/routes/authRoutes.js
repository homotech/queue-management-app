const express = require("express");
const router = express.Router();
const {
  signup,
  login,
  forgotpassword,
  resetpassword,
} = require("../controllers/authControllers");

router.post("/signup", signup);
router.post("/login", login);
router.post("/forgotpassword", forgotpassword);
router.post("/resetpassword", resetpassword);
router.get("/test", (req, res) => {
  res.send("Auth route connected ✅");
});

module.exports = router;
