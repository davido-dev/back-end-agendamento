const express = require('express');
const roteador = express.Router();

const servicoControlador = require('../controladores/servicoControlador');

roteador.get('/servicos', servicoControlador.consultarServicos);

roteador.get('/servicos/:id', servicoControlador.consultarServicoPorId);

roteador.post('/servicos', servicoControlador.criarServico);

roteador.put('/servicos/:id', servicoControlador.editarServico);

roteador.delete('/servicos/:id', servicoControlador.excluirServico);

module.exports = roteador;
