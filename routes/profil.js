const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
  res.json({
    nom: 'Jopie NLEMVO',
    localisation: 'Melun (77)',
    metier: 'Developpeur Web & IA',
    competences: ['HTML', 'CSS', 'JavaScript', 'React', 'Python', 'Node.js'],
    github: 'github.com/nlemvojopie-star'
  })
})

module.exports = router
