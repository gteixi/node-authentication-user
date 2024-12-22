import express from 'express'
import jwt from 'jsonwebtoken'
import cookieParser from 'cookie-parser'

import { PORT, SECRET_JWT_KEY } from './config.js'
import { UserRepository } from './user-respository.js'
import { UserSchema } from './schema/userSchema.js'

const app = express()

app.set('view engine', 'ejs')

app.use(express.json())
app.use(cookieParser())

app.use((req, res, next) => {
  const token = req.cookies.access_token
  req.session = { user: null }

  try {
    const data = jwt.verify(token, SECRET_JWT_KEY)
    req.session.user = data
  } catch (error) {
    req.session.user = null
  }

  next()
})

app.post('/register', async (req, res) => {
  const { username, password } = req.body

  try {
    UserSchema.parse({ username, password })
    const id = await UserRepository.create({ username, password })
    res.send({ id })
  } catch (error) {
    // Errores de zod
    if (error.errors) {
      return res.status(400).send({ error: error.errors })
    }
    // Errores generales
    res.status(400).send({ error: error.message })
  }
})

app.post('/login', async (req, res) => {
  const { username, password } = req.body

  try {
    UserSchema.parse({ username, password })
    const user = await UserRepository.login({ username, password })
    const token = jwt.sign({ _id: user._id, username: user.username }, SECRET_JWT_KEY, { expiresIn: '1h' })
    res
      .cookie('access_token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 1000 * 60 * 60
      })
      .send(user)
  } catch (error) {
    // Errores de zod
    if (error.errors) {
      return res.status(400).send({ error: error.errors })
    }
    // Errores generales
    res.status(400).send({ error: error.message })
  }
})

app.get('/protected', (req, res) => {
  const { user } = req.session
  if (!user) {
    return res.status(403).send({ error: 'Acceso denegado' })
  }
  res.render('protected', user)
})

app.get('/', (req, res) => {
  const { user } = req.session
  res.render('index', user)
})

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})
