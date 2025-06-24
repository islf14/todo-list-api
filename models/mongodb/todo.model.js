import { UUID } from 'mongodb'
import { connection } from './connection.js'

async function connect() {
  try {
    const client = connection()
    await client.connect()
    const database = client.db('tasks')
    return database.collection('task')
  } catch (error) {
    console.error('Error connecting to the database')
    await client.close()
  }
}

export class TodoModel {
  static async getAll() {
    const db = await connect()
    const data = await db.find().toArray()
    return data
  }

  static async create({ input, user }) {
    const db = await connect()
    const _id = new UUID()
    const newTask = {
      _id,
      ...input,
      user_id: user.id,
      createdAt: new Date(),
      updatedAt: new Date()
    }
    const { insertedId } = await db.insertOne(newTask)
    return insertedId
  }

  static async validateIdTask({ id }) {
    const db = await connect()
    // verify valid ID
    let _id = null
    try {
      _id = new UUID(id)
    } catch (error) {
      throw new Error('ID must be 32 hex digits (UUID)')
    }
    // find task to update
    const task = await db.findOne({ _id })
    if (!task) throw new Error('task not found')
    return task
  }

  static async update({ _id, input }) {
    const db = await connect()
    // updated data
    const updatedTask = {
      ...input,
      updatedAt: new Date()
    }
    try {
      await db.updateOne({ _id }, { $set: updatedTask })
      return updatedTask
    } catch (error) {
      console.log(error)
      throw new Error('could not be updated')
    }
  }

  static async delete({ _id }) {
    const db = await connect()
    try {
      await db.deleteOne({ _id })
      return
    } catch (error) {
      console.log(error)
      throw new Error('could not be deleted')
    }
  }
}
