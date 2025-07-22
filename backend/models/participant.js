const mongoose = require("mongoose");

const participantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  queueId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Queue",
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  note: {
    type: String,
  },
  joinedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Participant", participantSchema);
