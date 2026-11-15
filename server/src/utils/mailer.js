const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: { user: process.env.MAIL_USER, pass: process.env.MAIL_PASS },
});

exports.sendCode = (to, code) =>
  transporter.sendMail({
    from: process.env.MAIL_USER,
    to,
    subject: "Código para redefinir senha",
    text: `Seu código: ${code}. Expira em 15 minutos.`,
  });
