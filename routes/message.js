const express = require('express')
const router = express.Router()
const connectDB = require('../db')

router.get('/', async (req, res) => {
  const db = await connectDB()
  const messages = await db.collection('messages').find().toArray()
  res.json(messages)
})

router.post('/', async (req, res) => {
  const { nom, message } = req.body
  const db = await connectDB()
  const nouveauMessage = {
    nom,
    message,
    date: new Date().toLocaleDateString('fr-FR'),
    createdAt: new Date()
  }
  await db.collection('messages').insertOne(nouveauMessage)
  console.log('Message recu de ' + nom)
  res.json({
    statut: 'success',
    reponse: 'Merci ' + nom + ', ton message a bien ete sauvegarde dans MongoDB !'
  })
})

module.exports = router