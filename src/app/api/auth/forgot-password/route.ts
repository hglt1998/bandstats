// app/forgot-password/route.ts
import { NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'
import { connectDB } from '@/libs/mongodb';
import User from '@/models/user';
import { sendPasswordResetEmail } from '@/utils/nodemailer';

export async function POST(request: Request) {
  const { email } = await request.json();

  if (!process.env.JWT_SECRET) {
    return NextResponse.json({ message: 'Falta la clave secreta del servidor' }, { status: 500 });
  }

  try {
    await connectDB();

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ message: 'No existe un usuario con ese correo' }, { status: 404 });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Opcional: Guarda el token y expiración en la base de datos
    user.resetPasswordToken = token;
    user.resetPasswordExpires = Date.now() + 3600000; // Expira en 1 hora
    await user.save();

    // Enviar correo electrónico con el enlace de restablecimiento (reemplaza esta sección con tu lógica de envío de correo)
    // TODO: Implementar lógica de envío de correo electrónico
    await sendPasswordResetEmail(email, token)

    return NextResponse.json({ message: 'Se ha enviado un enlace de restablecimiento a tu correo electrónico' });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Error al procesar la solicitud' }, { status: 500 });
  }
}
