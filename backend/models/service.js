const mongoose = require("mongoose");
const serviceSchema = new mongoose.Schema(
  {
    businessId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Business",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    duration: Number,
  },
  { timestamps: true }
);
module.exports = mongoose.model("Service", serviceSchema);
