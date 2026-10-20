const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "moiz.315aug25webbpt@gmail.com",
    pass: "aepoxzgfpifxuyku",
  },
});

transporter.verify((error, success) => {
  if (error) {
    console.log("SMTP Error:", error);
  } else {
    console.log("SMTP Server ready to send emails");
  }
});


module.exports = transporter;
