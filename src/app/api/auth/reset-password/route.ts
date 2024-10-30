// app/reset-password/route.ts
import { NextResponse } from 'next/server'
import jwt, { JwtPayload } from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import User from '@/models/user';
import { connectDB } from '@/libs/mongodb';

export async function POST(request: Request) {
  const { token, password } = await request.json();

  if (!process.env.JWT_SECRET) {
    return NextResponse.json({ message: 'Falta configuración del servidor' }, { status: 500 });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET) as JwtPayload;
    await connectDB()

    const user = await User.findOne({
      _id: decoded.userId,
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) {
      return NextResponse.json({ message: 'Token inválido o expirado' }, { status: 400 });
    }

    user.password = await bcrypt.hash(password, 10);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    return NextResponse.json({ message: 'Contraseña restablecida exitosamente' });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Token inválido o expirado' }, { status: 400 });
  }
}
