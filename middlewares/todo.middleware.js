import jwt from 'jsonwebtoken'

export function todoMiddleware(req, res, next) {
  const token = req.cookies.access_todo
  if (token) {
    try {
      const user = jwt.verify(token, process.env.SIGN_JWT_SECRET)
      // console.log(user)
      return next()
    } catch (error) {
      console.log({ error: error.message })
    }
  }
  return res.status(401).json({ message: 'Unauthorized' })
}
