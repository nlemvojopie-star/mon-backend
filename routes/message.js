const express = require('express')
const router = express.Router()
const fs = require('fs')
const path = require('path')

const fichier = path.join(__dirname, '..', 'messages.json')

// GET — Lire tous les messages
router.get('/', (req, res) => {
  const messages = JSON.parse(fs.readFileSync(fichier, 'utf-8'))
  res.json(messages)
})

// POST — Sauvegarder un message
router.post('/', (req, res) => {
  const { nom, message } = req.body
  const messages = JSON.parse(fs.readFileSync(fichier, 'utf-8'))
  
  const nouveauMessage = {
    id: Date.now(),
    nom,
    message,
    date: new Date().toLocaleDateString('fr-FR')
  }
  
  messages.push(nouveauMessage)
  fs.writeFileSync(fichier, JSON.stringify(messages, null, 2))
  
  console.log(`📨 Message sauvegardé de ${nom}`)
  res.json({
    statut: 'success',
    reponse: `Merci ${nom}, ton message a bien été sauvegardé !`
  })
})

module.exports = router