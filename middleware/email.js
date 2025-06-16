const nodemailer = require("nodemailer");
const env = require("../config/env");

const emailTrans = nodemailer.createTransport({
  host: env.MAIL_DOMAIN,
  port: 465,
  secure: true,
  auth: {
    user: env.EMAIL_USER,
    pass: env.EMAIL_PASS
  }
});


module.exports = emailTrans;
