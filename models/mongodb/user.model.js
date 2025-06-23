import bcrypt from 'bcrypt'
import { connection } from './connection.js'

async function connect() {
  try {
    const client = connection()
    await client.connect()
    const database = client.db('tasks')
    return database.collection('user')
  } catch (error) {
    console.error('Error connecting to the database')
    await client.close()
  }
}

export class UserModel {
  static async create({ input }) {
    const { name, email, password } = input
    const db = await connect()
    // verify that it is unique
    const userFound = await db.findOne({ email })
    if (userFound) throw new Error('user already exist')
    // create user
    const hashedPassword = await bcrypt.hash(
      password,
      parseInt(process.env.SALT_ROUNDS)
    )
    const newUser = {
      name,
      email,
      password: hashedPassword
    }
    const { insertedId } = await db.insertOne(newUser)
    return insertedId
  }

  static async login({ input }) {
    const { email, password } = input
    const db = await connect()
    // find user
    const user = await db.findOne({ email })
    if (!user) throw new Error('user not found')
    const valid = await bcrypt.compare(password, user.password)
    if (!valid) throw new Error('password invalid')
    // return all except password
    const { password: _, ...showUser } = user
    return showUser
  }
}
