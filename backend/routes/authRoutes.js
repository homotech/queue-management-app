const express = require("express");
const router = express.Router();
const {
  signup,
  login,
  forgotpassword,
  resetpassword,
  deleteAccount,
} = require("../controllers/authControllers");
const authenticate = require("../middleware/authenticate");

router.post("/signup", signup);
router.post("/login", login);
router.post("/forgotpassword", forgotpassword);
router.post("/resetpassword", resetpassword);
router.get("/test", (req, res) => {
  res.send("Auth route connected ✅");
});
router.delete("/delete", authenticate, deleteAccount);

module.exports = router;
