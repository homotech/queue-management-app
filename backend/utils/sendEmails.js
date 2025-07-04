const { Resend } = require("resend");
require("dotenv").config();
const resend = new Resend(process.env.RESEND_API_KEY);

const sendEmail = async (to, subject, html) => {
  try {
    const data = await resend.emails.send({
      from: process.env.RESEND_SENDER_EMAIL,
      to,
      subject,
      html,
    });
    console.log("I just sent the email:", data);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};
module.exports = { sendEmail };
