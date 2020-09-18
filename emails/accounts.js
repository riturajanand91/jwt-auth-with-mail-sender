const nodemailer = require("nodemailer");

let transport = nodemailer.createTransport({
  host: process.env.EMAIL_SENDER_SERVER,
  port: process.env.EMAIL_SENDER_PORT,

  auth: {
    user: process.env.EMAIL_SENDER_MAIL_ID,
    pass: process.env.EMAIL_SENDER_PASSWORD,
  },
});

const welcomeMailSender = (email, name) => {
  transport.sendMail(
    {
      from: process.env.EMAIL_SENDER_MAIL_ID,
      to: email, // List of recipients
      subject: "Welcome to Node Task Manager REST API ", // Subject line
      text: `Welcome onboard ${name}!
      `, // Plain text body
    },
    function (err, info) {
      if (err) {
        // console.log(err);
      } else {
        // console.log(info);
      }
    }
  );
};
const mailsender = (email, name) => {
  transport.sendMail(
    {
      from: process.env.EMAIL_SENDER_MAIL_ID, // Sender address
      to: email, // List of recipients
      subject: "Welcome to Node Task Manager REST API ", // Subject line
      text: `Welcome onboard ${name}!
      `, // Plain text body
    },
  );
};
const cancellationmailsender = (email, name) => {
    transport.sendMail(
      {
        from: process.env.EMAIL_SENDER_MAIL_ID, // Sender address
        to: email, // List of recipients
        subject: "Sorry to see you go ", // Subject line
        text: `Sorry to see you go ${name}!
        `, // Plain text body
      },
    );
  };

module.exports = {
    mailsender,
    cancellationmailsender
};

