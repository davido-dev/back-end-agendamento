const express = require('express');
const router = express.Router();

const agendamentoControlador = require('../controladores/agendamentoControlador');

// Criar agendamento
router.post('/agendamentos', agendamentoControlador.criarAgendamento);

// Obter todos os agendamentos
router.get('/agendamentos', agendamentoControlador.obterAgendamentos);

// Obter agendamentos por usuário
router.get('/agendamentos/usuario/:id_usuario', agendamentoControlador.obterAgendamentosPorUsuario);

// Obter agendamentos por profissional
router.get(
  '/agendamentos/profissional/:id_profissional',
  agendamentoControlador.obterAgendamentosPorProfissional,
);

router.get(
  '/agendamentos/profissional/:id_profissional/data/:data',
  agendamentoControlador.obterAgendamentosPorProfissionalData,
);

// Alterar somente o status
router.put('/agendamentos/:id', agendamentoControlador.alterarStatusAgendamento);

// Obter agendamento por ID
router.get('/agendamentos/:id', agendamentoControlador.obterAgendamentoPorId);

// Deletar agendamento
router.delete('/agendamentos/:id', agendamentoControlador.deletarAgendamento);

module.exports = router;
