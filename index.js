import express, { json } from 'express'
import 'dotenv/config'
import { createTodoRouter } from './routes/todo.route.js'
import { loginRouter, registerRouter } from './routes/user.route.js'
import cookieParser from 'cookie-parser'

const app = express()
const port = process.env.PORT ?? 3000
app.disable('x-powered-by')
app.use(json())
app.use(cookieParser())

app.use('/todos', createTodoRouter())
app.use('/register', registerRouter)
app.use('/login', loginRouter)
app.get('/', (req, res) => {
  res.json('Welcome')
})

app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`)
})
