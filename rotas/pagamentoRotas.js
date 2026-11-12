const express = require('express');
const router = express.Router();

const pagamentoControlador = require('../controladores/pagamentoControlador');

// Criar pagamento
router.post('/pagamentos', pagamentoControlador.criarPagamento);

// Obter todos os pagamentos
router.get('/pagamentos', pagamentoControlador.obterPagamentos);

// Obter pagamento por agendamento
router.get(
  '/pagamentos/agendamento/:id_agendamento',
  pagamentoControlador.obterPagamentoPorAgendamento,
);

// Alterar somente o status
router.put('/pagamentos/:id', pagamentoControlador.alterarStatusPagamento);

// Obter pagamento por ID
router.get('/pagamentos/:id', pagamentoControlador.obterPagamentoPorId);

// Deletar pagamento
router.delete('/pagamentos/:id', pagamentoControlador.deletarPagamento);

module.exports = router;
