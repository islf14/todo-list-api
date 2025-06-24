import { TodoModel } from '../models/mongodb/todo.model.js'
import { validatePartialTodo, validateTodo } from './todo.validator.js'

export class TodoController {
  getAll = async (req, res) => {
    const tasks = await TodoModel.getAll()
    res.json(tasks)
  }

  create = async (req, res) => {
    if (!req.body)
      return res.status(400).json({ message: 'please enter valid values' })
    const result = validateTodo(req.body)
    if (result.error)
      return res.status(400).json({ error: JSON.parse(result.error.message) })
    try {
      const insertedId = await TodoModel.create({
        input: result.data,
        user: req.session.user
      })
      return res.json({ insertedId })
    } catch (error) {
      console.log(error)
      return res.status(400).json('error in create')
    }
  }

  update = async (req, res) => {
    if (!req.body)
      return res.status(400).json({ message: 'please enter valid values' })
    const result = validatePartialTodo(req.body)
    if (result.error)
      return res.status(400).json({ error: JSON.parse(result.error.message) })
    const { id } = req.params

    // verify valid ID
    let task = null
    try {
      task = await TodoModel.validateIdTask({ id })
    } catch (error) {
      console.log({ error: error.message })
      return res.status(400).json({ error: error.message })
    }

    // verify permission
    if (task.user_id === req.session.user.id) {
      // send idTask and data to Update
      try {
        const updated = await TodoModel.update({
          _id: task._id,
          input: result.data
        })
        return res.json({ updated })
      } catch (error) {
        console.log({ error: error.message })
        return res.status(400).json({ error: error.message })
      }
    } else {
      return res.status(403).json({ message: 'Forbidden' })
    }
  }

  delete = async (req, res) => {
    const { id } = req.params
    // verify valid ID
    let task = null
    try {
      task = await TodoModel.validateIdTask({ id })
    } catch (error) {
      console.log({ error: error.message })
      return res.status(400).json({ error: error.message })
    }

    if (task.user_id === req.session.user.id) {
      try {
        await TodoModel.delete({ _id: task._id })
        return res.status(204).json('deleted')
      } catch (error) {
        console.log({ error: error.message })
        return res.status(400).json({ error: error.message })
      }
    } else {
      return res.status(403).json({ message: 'Forbidden' })
    }
  }
}
