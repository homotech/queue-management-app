const Business = require("../models/business");
const Service = require("../models/service");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const { sendEmail } = require("../utils/sendEmails");

exports.signup = async (req, res) => {
  try {
    const { businessName, email, password, securityPin } = req.body;
    if (!businessName || !email || !password || !securityPin) {
      return res.status(400).json({ message: "All Fields are required" });
    }
    // }for when a user tries to sign up with an empty field

    const existing = await Business.findOne({ email }); //check if the business exists
    if (existing) {
      return res.status(400).json({ message: "Business already exists" });
    } else {
      const hashed = await bcrypt.hash(password, 10);
      const hashedPin = await bcrypt.hash(securityPin, 10);

      const business = await Business.create({
        businessName,
        email,
        password: hashed,
        securityPin: hashedPin,
      });
      const token = jwt.sign({ id: business._id }, process.env.JWT_SECRET, {
        expiresIn: "7d",
      });
      res.status(201).json({ token, business });
    }
  } catch (error) {
    console.error("Signup Error:", error);
    res.status(500).json({ message: "Signup Failed" });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const business = await Business.findOne({ email });
    if (!business) {
      return res
        .status(404)
        .json({ message: "Business Account doesn't exist" });
    }

    const isMatch = await bcrypt.compare(password, business.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid Password" });
    }

    const token = jwt.sign({ id: business._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.status(200).json({ token, business });
  } catch (error) {
    console.log("Login Error:", error);
    res.status(500).json({ message: "Login Failed" });
  }
};

exports.forgotpassword = async (req, res) => {
  const { email, securityPin } = req.body;
  try {
    const business = await Business.findOne({ email });
    if (!business) {
      return res
        .status(404)
        .json({ message: "Not sure you have a business account with us" });
    }
    const isPinMatch = await bcrypt.compare(securityPin, business.securityPin);
    if (!isPinMatch) {
      return res.status(400).json({ message: "That ain't your security pin" });
    }
    return res.status(200).json({
      message: "Oh yeah! Let's reset that password",
    });
    // await business.save();
  } catch (error) {
    console.error("Forgot Password Error:", error);
    res
      .status(500)
      .json({ message: "Mehn! I don't know, Something went wrong!" });
  }
};

exports.resetpassword = async (req, res) => {
  const { email, newPassword } = req.body;
  try {
    if (!email || !newPassword) {
      res.status(400).json({ message: "All fields are required" });
    }
    const business = await Business.findOne({ email });
    if (!business) {
      return res.status(404).json({ message: "Business not found" });
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    business.password = hashedPassword;
    await business.save();
    res.status(200).json({ message: "Hey, look, good as new!" });
  } catch (error) {
    console.error("Reset Password Error:", error);
    res.status(500).json({ message: "Nah man, Something went wrong!" });
  }
};

exports.deleteAccount = async (req, res) => {
  // const { email };
  try {
    const businessId = req.user.id;
    await Service.deleteMany({ businessId });
    const deleted = await Business.findByIdAndDelete(businessId);
    if (!deleted) {
      return res.status(404).json({ message: "Account wasn't deleted" });
    }
    return res.status(200).json({ message: "Account deleted successfully" });
  } catch (error) {
    console.error("Delete Account:", error);
    return res
      .status(500)
      .json({ message: "Something went wrong while deleting account" });
  }
};
