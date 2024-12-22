import { z } from 'zod'

export const UserSchema = z.object({
  _id: z.string().uuid().optional(),
  username: z.string().min(3, 'El nombre de usuario debe tener al menos 3 caracteres'),
  password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres')
})
