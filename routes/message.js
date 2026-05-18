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
// DELETE — Supprimer un message
router.delete('/:id', async (req, res) => {
  const { ObjectId } = require('mongodb')
  const db = await connectDB()
  await db.collection('messages').deleteOne({ _id: new ObjectId(req.params.id) })
  res.json({ statut: 'success', reponse: 'Message supprimé !' })
})

// PUT — Modifier un message
router.put('/:id', async (req, res) => {
  const { ObjectId } = require('mongodb')
  const { message } = req.body
  const db = await connectDB()
  await db.collection('messages').updateOne(
    { _id: new ObjectId(req.params.id) },
    { $set: { message, updatedAt: new Date() } }
  )
  res.json({ statut: 'success', reponse: 'Message modifié !' })
})
module.exports = router