const { Agendamento, Servico, Usuario, Profissional, Pet } = require('../modelos/associacoes');

const incluirAssociacoes = [
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
];

// Buscar agendamentos de um profissional em uma data
exports.obterAgendamentosPorProfissionalData = async (req, res) => {
  try {
    const { id_profissional, data } = req.params;

    const agendamentos = await Agendamento.findAll({
      where: { id_profissional, data },
      include: incluirAssociacoes,
    });

    res.json(agendamentos);
  } catch (erro) {
    console.error(erro);
    res.status(500).json({ erro: erro.message });
  }
};

// Criar agendamento
exports.criarAgendamento = async (req, res) => {
  try {
    const {
      data,
      hora_inicio,
      status,
      observacoes,
      id_usuario,
      id_profissional,
      id_servico,
      id_pet,
    } = req.body;

    if (!data || !hora_inicio || !id_usuario || !id_profissional || !id_servico || !id_pet) {
      return res.status(400).json({
        erro: 'Data, horário, usuário, profissional, serviço e pet são obrigatórios.',
      });
    }

    const agendamento = await Agendamento.create({
      data,
      hora_inicio,
      status,
      observacoes,
      id_usuario,
      id_profissional,
      id_servico,
      id_pet,
    });

    const agendamentoCompleto = await Agendamento.findByPk(agendamento.id_agendamento, {
      include: incluirAssociacoes,
    });

    res.status(201).json(agendamentoCompleto);
  } catch (erro) {
    console.error(erro);
    res.status(500).json({ erro: erro.message });
  }
};

// Obter todos os agendamentos
exports.obterAgendamentos = async (req, res) => {
  try {
    const agendamentos = await Agendamento.findAll({
      include: incluirAssociacoes,
    });

    res.json(agendamentos);
  } catch (erro) {
    console.error(erro);
    res.status(500).json({ erro: erro.message });
  }
};

// Obter agendamento por ID
exports.obterAgendamentoPorId = async (req, res) => {
  try {
    const agendamento = await Agendamento.findByPk(req.params.id, {
      include: incluirAssociacoes,
    });

    if (!agendamento) {
      return res.status(404).json({
        erro: 'Agendamento não encontrado.',
      });
    }

    res.json(agendamento);
  } catch (erro) {
    console.error(erro);
    res.status(500).json({ erro: erro.message });
  }
};

// Obter agendamentos por ID do usuário
exports.obterAgendamentosPorUsuario = async (req, res) => {
  try {
    const { id_usuario } = req.params;

    const agendamentos = await Agendamento.findAll({
      where: { id_usuario },
      include: incluirAssociacoes,
    });

    res.json(agendamentos);
  } catch (erro) {
    console.error(erro);
    res.status(500).json({ erro: erro.message });
  }
};

// Obter agendamentos por ID do profissional
exports.obterAgendamentosPorProfissional = async (req, res) => {
  try {
    const { id_profissional } = req.params;

    const agendamentos = await Agendamento.findAll({
      where: { id_profissional },
      include: incluirAssociacoes,
    });

    res.json(agendamentos);
  } catch (erro) {
    console.error(erro);
    res.status(500).json({ erro: erro.message });
  }
};

// Alterar somente o status
exports.alterarStatusAgendamento = async (req, res) => {
  try {
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({
        erro: 'O status é obrigatório.',
      });
    }

    const agendamento = await Agendamento.findByPk(req.params.id);

    if (!agendamento) {
      return res.status(404).json({
        erro: 'Agendamento não encontrado.',
      });
    }

    await agendamento.update({ status });

    const agendamentoAtualizado = await Agendamento.findByPk(req.params.id, {
      include: incluirAssociacoes,
    });

    res.json(agendamentoAtualizado);
  } catch (erro) {
    console.error(erro);
    res.status(500).json({ erro: erro.message });
  }
};

// Deletar agendamento
exports.deletarAgendamento = async (req, res) => {
  try {
    const agendamento = await Agendamento.findByPk(req.params.id);

    if (!agendamento) {
      return res.status(404).json({
        erro: 'Agendamento não encontrado.',
      });
    }

    await agendamento.destroy();

    res.json({
      mensagem: 'Agendamento removido com sucesso.',
    });
  } catch (erro) {
    console.error(erro);
    res.status(500).json({ erro: erro.message });
  }
};
