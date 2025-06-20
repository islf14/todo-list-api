import { Router } from 'express'
import { TodoController } from '../controllers/todo.controller.js'

export const createTodoRouter = () => {
  const todoRouter = Router()
  const todoController = new TodoController()

  todoRouter.get('/', todoController.getAll)
  todoRouter.post('/', todoController.create)

  return todoRouter
}
