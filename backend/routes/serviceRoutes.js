const express = require("express");
const router = express.Router();
const {
  createServices,
  getServices,
  editServices,
  deleteServices,
} = require("../controllers/serviceControllers");
const authenticate = require("../middleware/authenticate");

router.post("/create", authenticate, createServices);
router.get("/", authenticate, getServices);
router.put("/:id", authenticate, editServices);
router.delete("/:id", authenticate, deleteServices);

module.exports = router;
