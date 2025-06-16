require("dotenv").config();

module.exports = {
  PORT: process.env.PORT || 3000,
  EMAIL_USER: process.env.EMAIL_USER || "",
  EMAIL_PASS: process.env.EMAIL_PASS || "",
  EMAIL_RECEIVE: process.env.EMAIL_RECEIVE || "",
  MAIL_DOMAIN: process.env.MAIL_DOMAIN || ""
};

