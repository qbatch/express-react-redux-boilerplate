import nodemailer from 'nodemailer';

const { MAILER_HOST, MAILER_PORT, APP_SUPPORT_EMAIL, SUPPORT_EMAIL_PASSWORD } = process.env;

const sendEmail = async (options={
  from: APP_SUPPORT_EMAIL,
  subject: '',
  html: '',
}) => {
  const transporter = nodemailer.createTransport({
    host: MAILER_HOST,
    port: MAILER_PORT,
    secure: true,
    auth: {
      user: APP_SUPPORT_EMAIL,
      pass: SUPPORT_EMAIL_PASSWORD,
    },
  });

  return transporter.sendMail(options);
};

export default sendEmail;
