import DBLocal from 'db-local'
import { z } from 'zod'
import crypto from 'crypto'
const { Schema } = new DBLocal({ path: './db' })

const UserSchema = z.object({
  _id: z.string().uuid().optional(),
  username: z.string().min(3, 'El nombre de usuario debe tener al menos 3 caracteres'),
  password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres')
})

const User = Schema('User', {
  _id: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true }
})

export class UserRepository {
  static create ({ username, password }) {
    UserSchema.parse({ username, password })

    // Validación de usuario existente
    const existingUser = User.findOne({ username })

    if (existingUser) {
      throw new Error(`El usuario con el nombre "${username}" ya existe.`)
    }

    const id = crypto.randomUUID()

    User.create({ _id: id, username, password }).save()

    return id
  }

  static login ({ username, password }) {}
}
