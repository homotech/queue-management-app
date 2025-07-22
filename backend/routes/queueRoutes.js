const express = require("express");
const authenticate = require("../middleware/authenticate");
const { createQueue } = require("../controllers/queueControllers");

const router = express.Router();
router.post("/create", authenticate, createQueue);

module.exports = router;
