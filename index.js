import express, { json } from 'express'
import 'dotenv/config'
import { createTodoRouter } from './routes/todo.route.js'

const app = express()
const port = process.env.PORT ?? 3000
app.disable('x-powered-by')

app.use(json())
app.use('/todo', createTodoRouter())

app.get('/', (req, res) => {
  res.json('Welcome')
})

app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`)
})
