import { UserModel } from '../models/mongodb/user.model.js'
import { validateLogin, validateUser } from './user.validator.js'

export class UserController {
  register = async (req, res) => {
    if (!req.body)
      return res.status(400).json({ message: 'please inter valid values' })
    const result = validateUser(req.body)
    if (result.error) {
      return res.status(400).json({ error: JSON.parse(result.error.message) })
    }
    const user = await UserModel.create({ input: result.data })
    if (!user) return res.status(400).json({ error: 'user already exists' })
    return res.status(201).json({ user })
  }

  login = async (req, res) => {
    if (!req.body)
      return res.status(400).json({ message: 'please inter valid values' })
    const result = validateLogin(req.body)
    if (result.error) {
      return res.status(400).json({ error: JSON.parse(result.error.message) })
    }
    const user = await UserModel.login({ input: result.data })
    if (!user) return res.status(400).json({ error: 'error in login' })
    return res.status(200).json({ user })
  }
}
