const Servico = require('../models/servico.js');

async function criarServico(req, res) {
  try {
    const {
      nome,
      descricao,
      tamanho,
      valor_estimado,
    } = req.body;

    if (!nome || !tamanho || valor_estimado === undefined) {
      return res.status(400).json({
        erro: 'Nome, tamanho e valor estimado são obrigatórios.',
      });
    }

    const servico = await Servico.create({
      nome,
      descricao,
      tamanho,
      valor_estimado,
    });

    res.status(201).json(servico);
  } catch (erro) {
    res.status(500).json({
      erro: erro.message,
    });
  }
}

async function consultarServicos(req, res) {
  try {
    const dados = await Servico.findAll();

    res.status(200).json(dados);
  } catch (erro) {
    console.log(erro);

    res.status(500).json({
      erro: erro.message,
    });
  }
}

async function consultarServicoPorId(req, res) {
  try {
    const servico = await Servico.findByPk(req.params.id);

    if (!servico) {
      return res.status(404).json({
        erro: 'Serviço não encontrado.',
      });
    }

    res.status(200).json(servico);
  } catch (erro) {
    res.status(500).json({
      erro: erro.message,
    });
  }
}

async function editarServico(req, res) {
  try {
    const servico = await Servico.findByPk(req.params.id);

    if (!servico) {
      return res.status(404).json({
        erro: 'Serviço não encontrado.',
      });
    }

    const {
      nome,
      descricao,
      tamanho,
      valor_estimado,
    } = req.body;

    await servico.update({
      nome,
      descricao,
      tamanho,
      valor_estimado,
    });

    res.status(200).json(servico);
  } catch (erro) {
    res.status(500).json({
      erro: erro.message,
    });
  }
}

async function excluirServico(req, res) {
  try {
    const servico = await Servico.findByPk(req.params.id);

    if (!servico) {
      return res.status(404).json({
        erro: 'Serviço não encontrado.',
      });
    }

    await servico.destroy();

    res.status(200).json({
      mensagem: 'Serviço deletado com sucesso.',
    });
  } catch (erro) {
    res.status(500).json({
      erro: erro.message,
    });
  }
}

module.exports = {
  criarServico,
  consultarServicos,
  consultarServicoPorId,
  editarServico,
  excluirServico,
};
