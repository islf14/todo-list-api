import { UserModel } from '../models/mongodb/user.model.js'
import { validateLogin, validateUser } from './user.validator.js'
import jwt from 'jsonwebtoken'

export class UserController {
  register = async (req, res) => {
    if (!req.body)
      return res.status(400).json({ message: 'please inter valid values' })
    const result = validateUser(req.body)
    if (result.error) {
      return res.status(400).json({ error: JSON.parse(result.error.message) })
    }
    try {
      const user = await UserModel.create({ input: result.data })
      return res.status(201).json({ user })
    } catch (error) {
      console.log({ error: error.message })
      return res.status(400).json({ error: 'error in create' })
    }
  }

  login = async (req, res) => {
    if (!req.body)
      return res.status(400).json({ message: 'please inter valid values' })
    const result = validateLogin(req.body)
    if (result.error) {
      return res.status(400).json({ error: JSON.parse(result.error.message) })
    }
    try {
      const user = await UserModel.login({ input: result.data })
      // generate token
      const token = jwt.sign(
        {
          id: user._id,
          name: user.name,
          email: user.email
        },
        process.env.SIGN_JWT_SECRET,
        {
          expiresIn: '1h'
        }
      )
      // set token with cookie
      return res
        .status(200)
        .cookie('access_todo', token, {
          maxAge: 1000 * 60 * 60,
          httpOnly: true,
          sameSite: 'strict',
          secure: process.env.NODE_ENV === 'production'
        })
        .send({ token })
    } catch (error) {
      console.log({ error: error.message })
      return res.status(400).json({ error: 'error in login' })
    }
  }
}
