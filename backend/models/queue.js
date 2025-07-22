const mongoose = require("mongoose");
const QueueSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: String,
  maxPeople: Number,
  isPublic: {
    type: Boolean,
    required: true,
  },
  autoCloseTime: Date,
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Queue", QueueSchema);
