// utils/nodemailer.js
import nodemailer from 'nodemailer';

export const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT) | 465,
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

export const sendPasswordResetEmail = async (email: string, token: string) => {
  const resetLink = `http://localhost:4000/reset-password?token=${token}`;
  const mailOptions = {
    from: process.env.SMTP_USER,
    to: email,
    subject: 'Restablece tu contraseña',
    html: `<p>Haz clic en el siguiente enlace para restablecer tu contraseña:</p>
           <a href="${resetLink}">Restablecer contraseña</a>`,
  };

  try {
    await transporter.sendMail(mailOptions).catch(error => console.error("Error: ", error));
  } catch (error) {
    if (error instanceof Error) {
      throw new Error("Ha habido un error al enviar el correo: ", error)
    }
  }
};
