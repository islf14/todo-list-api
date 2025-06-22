import { TodoModel } from '../models/mongodb/todo.model.js'

export class TodoController {
  getAll = (req, res) => {
    console.log('in getall')
  }

  create = async (req, res) => {
    const task = await TodoModel.create({ input: req.body })
    return res.json(task)
  }
  update = (req, res) => {}
  delete = (req, res) => {}
}
