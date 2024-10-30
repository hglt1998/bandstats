import { Schema, model, models } from "mongoose";

const userSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: [true, "El email es requerido"],
    match: [
      /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
      "Email no válido"
    ]
  },
  password: {
    type: String,
    required: [true, "La contraseña es requerida"],
    select: false
  },
  fullname: {
    type: String,
    required: [true, "El nombre es requerido"],
    minLength: [3, "El nombre debe tener 3 caracteres como mínimo"],
    maxLength: [50, "El nombre debe tener 50 caracteres como máximo"]
  },
  resetPasswordToken: {
    type: String
  },
  resetPasswordExpires: {
    type: Date
  }
})

const User = models.User || model('User', userSchema)

export default User