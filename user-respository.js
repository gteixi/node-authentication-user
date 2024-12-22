import DBLocal from 'db-local'
import bcrypt from 'bcrypt'

import crypto from 'crypto'

import { SALT_ROUNDS } from './config.js'
import { UserSchema } from './schema/userSchema.js'
const { Schema } = new DBLocal({ path: './db' })

const User = Schema('User', {
  _id: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true }
})

export class UserRepository {
  static async create ({ username, password }) {
    UserSchema.parse({ username, password })

    // Validación de usuario existente
    const existingUser = User.findOne({ username })

    if (existingUser) {
      throw new Error(`El usuario con el nombre "${username}" ya existe.`)
    }

    const id = crypto.randomUUID()

    // Hash de la contraseña
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS)

    User.create({ _id: id, username, password: hashedPassword }).save()

    return id
  }

  static async login ({ username, password }) {
    UserSchema.parse({ username, password })

    const user = User.findOne({ username })

    if (!user) {
      throw new Error('Usuario no encontrado')
    }

    const isValid = await bcrypt.compare(password, user.password)

    if (!isValid) {
      throw new Error('Contraseña incorrecta')
    }

    const { password: _, ...publicUser } = user

    return publicUser
  }
}
