const express = require('express');
const roteador = express.Router();

const profissionalControlador = require('../controladores/profissionalControlador.js');

// Listar todos os profissionais
roteador.get('/profissionais', profissionalControlador.obterProfissionais);

// Buscar profissional pelo ID do usuário
roteador.get(
  '/profissionais/usuario/:id_usuario',
  profissionalControlador.buscarProfissionalPorUsuario,
);

// Buscar profissional pelo ID
roteador.get('/profissionais/:id', profissionalControlador.obterProfissionalPorId);

// Cadastrar profissional
roteador.post('/profissionais', profissionalControlador.criarProfissional);

// Atualizar profissional
roteador.put('/profissionais/:id', profissionalControlador.atualizarProfissional);

// Excluir profissional
roteador.delete('/profissionais/:id', profissionalControlador.deletarProfissional);

module.exports = roteador;
