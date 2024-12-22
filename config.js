import dotenv from 'dotenv'
dotenv.config()

export const {
  PORT = 3000,
  SALT_ROUNDS = 10, // Producción: 10, Test: 2
  SECRET_JWT_KEY = process.env.SECRET_JWT_KEY
} = process.env
