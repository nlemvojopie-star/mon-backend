const { MongoClient } = require('mongodb')

const uri = 'mongodb://localhost:27017'

const client = new MongoClient(uri)

async function connectDB() {
  await client.connect()
  console.log('Connecte a MongoDB local !')
  return client.db('formation')
}

module.exports = connectDB