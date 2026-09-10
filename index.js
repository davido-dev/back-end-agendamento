const express = require('express')
const app = express()
const cors = require('cors')

const usuarioRotas = require('./rotas/usuarioRotas')
const servicoRotas = require('./rotas/servicoRotas')

app.use(cors({
    origin: 'http://127.0.0.1:5500',
    methods: 'GET, POST, PUT, DELETE',
    allowedHeader: 'Content-Type'
}))

app.use(express.json())

app.use('/api', usuarioRotas)

app.use('/api', servicoRotas)

app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000")
})
