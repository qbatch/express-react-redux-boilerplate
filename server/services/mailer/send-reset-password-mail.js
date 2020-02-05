import sendEmail from './send-email';

const { NODE_ENV, APP_URL, CLIENT_PORT, APP_NAME } = process.env;

const sendResetPasswordMail = async (to, resetPasswordToken) => {
  const appUrl = NODE_ENV === 'development' ? `http://localhost:${CLIENT_PORT}` : APP_URL;
  const subject = 'Reset Password';
  const html = `<div>
    <p>
      You are receiving this because you (or someone else) has requested the reset of the password for your ${APP_NAME} account.
    </p>
    <p>
      Click <a href='${appUrl}/auth/reset-password/${resetPasswordToken}' target='_blank'>here</a> to reset your password.
    </p>
    <p>
      If you did not request this, please ignore this email and your password will remain unchanged.
    </p>
  </div>`;

  return sendEmail({ to, subject, html });
};

export default sendResetPasswordMail;
