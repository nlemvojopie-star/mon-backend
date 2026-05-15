const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
  res.json([
    { titre: 'Carte de Visite', tech: 'HTML + CSS' },
    { titre: 'Calculatrice', tech: 'JavaScript' },
    { titre: 'To-Do List', tech: 'JavaScript + DOM' },
    { titre: 'Portfolio React', tech: 'React + Tailwind' }
  ])
})

module.exports = router
