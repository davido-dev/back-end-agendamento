const express = require('express');
const roteador = express.Router();
const usuarioControlador = require('../controladores/usuarioControlador');

roteador.get('/usuarios', usuarioControlador.obterUsuarios);
roteador.get('/usuarios/:id', usuarioControlador.obterUsuarioPorId);
roteador.get('/usuarios/cpf/:cpf', usuarioControlador.buscarUsuarioPorCpf);

roteador.post('/usuarios', usuarioControlador.criarUsuario);
roteador.put('/usuarios/:id', usuarioControlador.atualizarUsuario);
roteador.delete('/usuarios/:id', usuarioControlador.deletarUsuario);

roteador.post('/login', usuarioControlador.login);

module.exports = roteador;
