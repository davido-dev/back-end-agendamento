const express = require('express');
const roteador = express.Router();
const profissionalControlador = require('../controladores/profissionalControlador.js');

roteador.get('/profissionais', profissionalControlador.obterProfissionais);
roteador.get('/profissionais/:id', profissionalControlador.obterProfissionalPorId);
roteador.get('/profissionais/usuario/:id_usuario', profissionalControlador.buscarProfissionalPorUsuario);

roteador.post('/profissionais', profissionalControlador.criarProfissional);
roteador.put('/profissionais/:id', profissionalControlador.atualizarProfissional);
roteador.delete('/profissionais/:id', profissionalControlador.deletarProfissional);

module.exports = roteador;
