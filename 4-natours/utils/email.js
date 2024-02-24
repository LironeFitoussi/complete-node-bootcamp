const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
  // 1) Create a transporter
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  // 2) Define the mail options
  const mailOptions = {
    from: 'Lirone Fitousi <lironefit@gmail.com>',
    to: options.email,
    subject: options.subject,
    text: options.text,
    // html:
  };

  // 3) Actually send the email
  await transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log('Message sent: %s', info.messageId);
    }
  });
};

module.exports = sendEmail;

// service: 'Gmail',
// TODO: Activate in gmail "less secure app" option
