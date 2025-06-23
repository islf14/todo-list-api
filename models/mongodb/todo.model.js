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
  static async gellAll() {
    const db = await connect()
  }

  static async create({ input }) {
    const db = await connect()
    const _id = new UUID()
    const newTask = {
      _id,
      ...input
    }
    const { insertedId } = await db.insertOne(newTask)
    return insertedId
  }

  static update({ input }) {
    console.log(input)
  }
}
