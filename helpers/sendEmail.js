const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendEmail = async data => {
  const msg = { ...data, from: 'eujinnlucashow@gmail.com' };
  await sgMail.send(msg);
  return true;
};

module.exports = sendEmail;
