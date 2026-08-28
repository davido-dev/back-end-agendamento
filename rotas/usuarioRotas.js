const express = require('express')
const roteador = express.Router()

const usuarioControlador = require('../controladores/usuarioControlador')

roteador.get('/usuarios', usuarioControlador.consultarUsuarios)
roteador.get('/usuarios/:id', usuarioControlador.consultarUsuarioPorId)
roteador.get('/usuarios/cpf/:cpf', usuarioControlador.consultarUsuarioPorCpf)
roteador.post('/usuarios', usuarioControlador.criarUsuario)
roteador.put('/usuarios/:id', usuarioControlador.editarUsuario)
roteador.delete('/usuarios/:id', usuarioControlador.excluirUsuario)
roteador.post('/login', usuarioControlador.usuarioLogin)


module.exports = roteador
