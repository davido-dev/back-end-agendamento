const express = require('express');

const roteador = express.Router();

const profissionalControlador = require('../controladores/profissionalControlador');

roteador.get('/profissionais', profissionalControlador.consultarProfissionais);

roteador.get('/profissionais/:id', profissionalControlador.consultarProfissionalPorId);

roteador.post('/profissionais', profissionalControlador.criarProfissional);

roteador.put('/profissionais/:id', profissionalControlador.editarProfissional);

roteador.delete('/profissionais/:id', profissionalControlador.excluirProfissional);

module.exports = roteador;
