const express = require('express')
const cors = require('cors')
const app = express()
const PORT = 3001

// Middlewares
app.use(cors())
app.use(express.json())

// Routes
app.use('/profil', require('./routes/profil'))
app.use('/projets', require('./routes/projets'))
app.use('/message', require('./routes/message'))

// Démarrer le serveur
app.listen(PORT, () => {
  console.log(`✅ Serveur démarré sur http://localhost:${PORT}`)
})