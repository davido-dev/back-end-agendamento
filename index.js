const express = require('express')
const app = express()

const usuarioRotas = require('./rotas/usuarioRotas')

app.use(express.json())

app.use('/api', usuarioRotas)

app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000")
})
