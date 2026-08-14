const express = require('express')
const roteador = express.Router()

const usuarioControlador = require('../controladores/usuarioControlador')

roteador.get('/usuarios', usuarioControlador.consultarUsuarios)

module.exports = roteador
