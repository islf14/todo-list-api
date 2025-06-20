import { MongoClient, ObjectId } from 'mongodb'

const DEFAULT_CONFIG =
  'mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.3.8'

const uri = process.env.URI_MONGODB ?? DEFAULT_CONFIG
const client = new MongoClient(uri)

async function connect() {
  try {
    await client.connect()
    const database = client.db('blogs')
    return database.collection('blog')
  } catch (error) {
    console.error('Error connecting to the database')
    await client.close()
  }
}

export class TodoModel {
  static gellAll() {}
}
