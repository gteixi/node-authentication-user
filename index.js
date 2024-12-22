import express from 'express'
import { PORT } from './config.js'
import { UserRepository } from './user-respository.js'
import { UserSchema } from './schema/userSchema.js'

const app = express()
app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello World!')
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
    const user = await UserRepository.login({ username, password })
    res.send(user)
  } catch (error) {
    res.status(400).send({ error: error.message })
  }
})

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})
