const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
dotenv.config();
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.NODEMAILER_USER,
    pass: process.env.NODEMAILER_PASS,
  },
});

function sendMail(toEmail, subject, content) {
  const mailOption = {
    from: "ppcupcs@gmail.com",
    to: toEmail,
    subject: subject,
    html: content,
  };

  transporter.sendMail;
  mailOption,
    (error, info) => {
      if (error) {
        console.log("error occurred", error);
      } else {
        console.log("Email sent:", info.response);
      }
    };
}

module.exports = { sendMail };
