import { TodoModel } from '../models/mongodb/todo.model.js'
import { validateTodo } from './todo.validator.js'

export class TodoController {
  getAll = (req, res) => {
    console.log('in getall')
  }

  create = async (req, res) => {
    if (!req.body)
      return res.status(400).json({ message: 'please enter valid values' })
    const result = validateTodo(req.body)
    if (result.error)
      return res.status(400).json({ error: JSON.parse(result.error.message) })
    try {
      const insertedId = await TodoModel.create({ input: result.data })
      console.log(insertedId)
      return res.json({ insertedId })
    } catch (error) {
      console.log(error)
      return res.status(400).json('error in create')
    }
  }
  update = (req, res) => {
    if (!req.body)
      return res.status(400).json({ message: 'please enter valid values' })
    console.log(req.body)
    return res.json('in update controller')
  }
  delete = (req, res) => {}
}
