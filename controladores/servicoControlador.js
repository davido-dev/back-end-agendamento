const Servico = require('../modelos/Servico');

// Criar serviço
exports.criarServico = async (req, res) => {
  try {
    const { nome, descricao, duracao_minutos, valor, status } = req.body;

    // Validação dos campos obrigatórios
    if (!nome || duracao_minutos === undefined || valor === undefined || !status) {
      return res.status(400).json({
        erro: 'Nome, duração, valor e status são obrigatórios.'
      });
    }

    // Cria o serviço
    const servico = await Servico.create({
      nome,
      descricao,
      duracao_minutos,
      valor,
      status
    });

    res.status(201).json(servico);

  } catch (erro) {
    console.error(erro);

    res.status(500).json({
      erro: erro.message
    });
  }
};


// Listar todos os serviços
exports.obterServicos = async (req, res) => {
  try {
    const servicos = await Servico.findAll();

    res.json(servicos);

  } catch (erro) {
    console.error(erro);

    res.status(500).json({
      erro: erro.message
    });
  }
};


// Buscar serviço por ID
exports.obterServicoPorId = async (req, res) => {
  try {
    const servico = await Servico.findByPk(req.params.id);

    if (!servico) {
      return res.status(404).json({
        erro: 'Serviço não encontrado.'
      });
    }

    res.json(servico);

  } catch (erro) {
    console.error(erro);

    res.status(500).json({
      erro: erro.message
    });
  }
};


// Atualizar serviço
exports.atualizarServico = async (req, res) => {
  try {
    const servico = await Servico.findByPk(req.params.id);

    if (!servico) {
      return res.status(404).json({
        erro: 'Serviço não encontrado.'
      });
    }

    const {
      nome,
      descricao,
      duracao_minutos,
      valor,
      status
    } = req.body;

    // Validação dos campos obrigatórios
    if (!nome || duracao_minutos === undefined || valor === undefined || !status) {
      return res.status(400).json({
        erro: 'Nome, duração, valor e status são obrigatórios.'
      });
    }

    await servico.update({
      nome,
      descricao,
      duracao_minutos,
      valor,
      status
    });

    res.json(servico);

  } catch (erro) {
    console.error(erro);

    res.status(500).json({
      erro: erro.message
    });
  }
};


// Deletar serviço
exports.deletarServico = async (req, res) => {
  try {
    const servico = await Servico.findByPk(req.params.id);

    if (!servico) {
      return res.status(404).json({
        erro: 'Serviço não encontrado.'
      });
    }

    await servico.destroy();

    res.json({
      mensagem: 'Serviço removido com sucesso.'
    });

  } catch (erro) {
    console.error(erro);

    res.status(500).json({
      erro: erro.message
    });
  }
};
