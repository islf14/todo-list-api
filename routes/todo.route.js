import { Router } from 'express'
import { TodoController } from '../controllers/todo.controller.js'
import { todoMiddleware } from '../middlewares/todo.middleware.js'

export const createTodoRouter = () => {
  const todoRouter = Router()
  const todoController = new TodoController()

  todoRouter.use(todoMiddleware)
  todoRouter.get('/', todoController.getAll)
  todoRouter.post('/', todoController.create)
  todoRouter.put('/:id', todoController.update)

  return todoRouter
}
