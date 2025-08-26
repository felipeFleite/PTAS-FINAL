const express = require('express')
const app = express()
const port = 3001
const usuarioController = require('./controllers/usuarioController')
const usuarioRoutes = require('./routes/usuarioRoute')

app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.use("/auth", router)

app.listen(PORT, (err) =>{
    console.log(`Aplicação rodando em localhost:${PORT}`)
})