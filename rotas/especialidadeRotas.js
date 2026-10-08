const express = require('express');

const roteador = express.Router();

const especialidadeControlador = require('../controladores/especialidadeControlador.js');

roteador.get('/especialidades', especialidadeControlador.obterEspecialidades);

roteador.get('/especialidades/:id', especialidadeControlador.obterEspecialidadePorId);

roteador.post('/especialidades', especialidadeControlador.criarEspecialidade);

roteador.put('/especialidades/:id', especialidadeControlador.atualizarEspecialidade);

roteador.delete('/especialidades/:id', especialidadeControlador.deletarEspecialidade);

module.exports = roteador;
