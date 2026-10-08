const express = require('express');

const roteador = express.Router();

const servicoControlador = require('../controladores/servicoControlador.js');

roteador.get('/servicos', servicoControlador.obterServicos);

roteador.get('/servicos/:id', servicoControlador.obterServicoPorId);

roteador.post('/servicos', servicoControlador.criarServico);

roteador.put('/servicos/:id', servicoControlador.atualizarServico);

roteador.delete('/servicos/:id', servicoControlador.deletarServico);

module.exports = roteador;
