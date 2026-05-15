const express = require('express')
const router = express.Router()

router.post('/', (req, res) => {
  const { nom, message } = req.body
  console.log('Message recu de ' + nom)
  res.json({
    statut: 'success',
    reponse: 'Merci ' + nom + ', ton message a bien ete recu !'
  })
})

module.exports = router
