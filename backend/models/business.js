const mongoose = require("mongoose");
const { type } = require("os");

const businessSchema = new mongoose.Schema(
  {
    businessName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    securityPin: {
      type: String,
      required: true,
    },
    // resetPasswordToken: {
    //   type: String,
    //   default: null,
    // },
    // resetPasswordExpires: {
    //   type: Date,
    //   default: null,
    // },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Business", businessSchema);
