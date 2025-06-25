import { TodoModel } from '../models/mongodb/todo.model.js'
import { validatePartialTodo, validateTodo } from './todo.validator.js'

export class TodoController {
  getAll = async (req, res) => {
    const { page, limit } = req.query
    //set page and limit
    let pageNumber = parseInt(page)
    let nPerPage = parseInt(limit)
    if (isNaN(pageNumber) || pageNumber <= 0) pageNumber = 1
    if (isNaN(nPerPage) || nPerPage <= 0) nPerPage = 20

    // count all tasks
    const count = await TodoModel.countAll({ userId: req.session.user._id })
    // find in db
    try {
      const data = await TodoModel.getAll({
        userId: req.session.user._id,
        pageNumber,
        nPerPage
      })
      // return data
      const tasks = {
        data,
        page: pageNumber,
        limit: nPerPage,
        total: count
      }
      res.json(tasks)
    } catch (error) {
      console.log(error.message)
      return res.status(400).json('error getting all')
    }
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
        userId: req.session.user._id
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
    if (task.user_id === req.session.user._id) {
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
    // verify permission
    if (task.user_id === req.session.user._id) {
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
