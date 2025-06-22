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
    console.log(input)
    const db = await connect()
    const insertedId = await db.insertOne(input)
    console.log(insertedId)
    return insertedId
  }
}
