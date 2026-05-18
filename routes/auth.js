const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const connectDB = require('../db')

// POST — Inscription
router.post('/register', async (req, res) => {
  const { nom, email, motDePasse } = req.body
  const db = await connectDB()
  
  const existe = await db.collection('users').findOne({ email })
  if (existe) return res.status(400).json({ erreur: 'Email deja utilise !' })
  
  const hash = await bcrypt.hash(motDePasse, 10)
  await db.collection('users').insertOne({ nom, email, motDePasse: hash })
  
  res.json({ message: 'Compte cree avec succes !' })
})

// POST — Connexion
router.post('/login', async (req, res) => {
  const { email, motDePasse } = req.body
  const db = await connectDB()
  
  const user = await db.collection('users').findOne({ email })
  if (!user) return res.status(400).json({ erreur: 'Email introuvable !' })
  
  const valide = await bcrypt.compare(motDePasse, user.motDePasse)
  if (!valide) return res.status(400).json({ erreur: 'Mot de passe incorrect !' })
  
  const token = jwt.sign(
    { id: user._id, nom: user.nom },
    process.env.JWT_SECRET,
    { expiresIn: '24h' }
  )
  
  res.json({ token, nom: user.nom })
})

module.exports = router
