import express from 'express'
import { PORT } from './config.js'
import { UserRepository } from './user-respository.js'
import { UserSchema } from './schema/userSchema.js'

const app = express()

app.set('view engine', 'ejs')

app.use(express.json())

app.get('/', (req, res) => {
  res.render('index')
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
    res.send(user)
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
  res.render('protected')
})

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})
