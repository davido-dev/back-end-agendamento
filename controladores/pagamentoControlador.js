const {
  Pagamento,
  Agendamento,
  Servico,
  Usuario,
  Pet,
  Profissional,
} = require('../modelos/associacoes');

const incluirAssociacoes = [
  {
    model: Agendamento,
    as: 'agendamento',
    include: [
      {
        model: Servico,
        as: 'servico',
        attributes: ['id_servico', 'nome', 'duracao_minutos', 'valor'],
      },
      {
        model: Usuario,
        as: 'usuario',
        attributes: ['id_usuario', 'nome', 'email'],
      },
      {
        model: Pet,
        as: 'pet',
        attributes: ['id_pet', 'nome', 'tipo', 'raca'],
      },
      {
        model: Profissional,
        as: 'profissional',
        include: [
          {
            model: Usuario,
            as: 'usuario',
            attributes: ['id_usuario', 'nome'],
          },
        ],
      },
    ],
  },
];

// Criar pagamento
exports.criarPagamento = async (req, res) => {
  try {
    const { valor, forma_pagamento, status, id_agendamento } = req.body;

    if (!valor || !forma_pagamento || !id_agendamento) {
      return res.status(400).json({
        erro: 'Valor, forma de pagamento e agendamento são obrigatórios.',
      });
    }

    const agendamento = await Agendamento.findByPk(id_agendamento);

    if (!agendamento) {
      return res.status(404).json({
        erro: 'Agendamento não encontrado.',
      });
    }

    const pagamento = await Pagamento.create({
      valor,
      forma_pagamento,
      status: status ?? 'PAGO',
      id_agendamento,
    });

    const pagamentoCompleto = await Pagamento.findByPk(pagamento.id_pagamento, {
      include: incluirAssociacoes,
    });

    res.status(201).json(pagamentoCompleto);
  } catch (erro) {
    console.error(erro);
    res.status(500).json({ erro: erro.message });
  }
};

// Obter todos os pagamentos
exports.obterPagamentos = async (req, res) => {
  try {
    const pagamentos = await Pagamento.findAll({
      include: incluirAssociacoes,
    });

    res.json(pagamentos);
  } catch (erro) {
    console.error(erro);
    res.status(500).json({ erro: erro.message });
  }
};

// Obter pagamento por ID
exports.obterPagamentoPorId = async (req, res) => {
  try {
    const pagamento = await Pagamento.findByPk(req.params.id, {
      include: incluirAssociacoes,
    });

    if (!pagamento) {
      return res.status(404).json({
        erro: 'Pagamento não encontrado.',
      });
    }

    res.json(pagamento);
  } catch (erro) {
    console.error(erro);
    res.status(500).json({ erro: erro.message });
  }
};

// Obter pagamento por ID do agendamento
exports.obterPagamentoPorAgendamento = async (req, res) => {
  try {
    const { id_agendamento } = req.params;

    const pagamento = await Pagamento.findOne({
      where: { id_agendamento },
      include: incluirAssociacoes,
    });

    if (!pagamento) {
      return res.status(404).json({
        erro: 'Nenhum pagamento encontrado para este agendamento.',
      });
    }

    res.json(pagamento);
  } catch (erro) {
    console.error(erro);
    res.status(500).json({ erro: erro.message });
  }
};

// Alterar somente o status
exports.alterarStatusPagamento = async (req, res) => {
  try {
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({
        erro: 'O status é obrigatório.',
      });
    }

    const pagamento = await Pagamento.findByPk(req.params.id);

    if (!pagamento) {
      return res.status(404).json({
        erro: 'Pagamento não encontrado.',
      });
    }

    await pagamento.update({ status });

    const pagamentoAtualizado = await Pagamento.findByPk(req.params.id, {
      include: incluirAssociacoes,
    });

    res.json(pagamentoAtualizado);
  } catch (erro) {
    console.error(erro);
    res.status(500).json({ erro: erro.message });
  }
};

// Deletar pagamento
exports.deletarPagamento = async (req, res) => {
  try {
    const pagamento = await Pagamento.findByPk(req.params.id);

    if (!pagamento) {
      return res.status(404).json({
        erro: 'Pagamento não encontrado.',
      });
    }

    await pagamento.destroy();

    res.json({
      mensagem: 'Pagamento removido com sucesso.',
    });
  } catch (erro) {
    console.error(erro);
    res.status(500).json({ erro: erro.message });
  }
};
