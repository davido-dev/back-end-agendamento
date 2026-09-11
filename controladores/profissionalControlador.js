const Profissional = require('../models/profissional.js');

async function criarProfissional(req, res) {
  try {
    const profissional = await Profissional.create(req.body);
    res.status(201).json(profissional);
  } catch (erro) {
    res.status(500).json({ erro: erro.message });
  }
}

async function consultarProfissionais(req, res) {
  try {
    const dados = await Profissional.findAll();
    res.status(200).json(dados);
  } catch (erro) {
    console.log(erro);
    res.status(500).json({ erro: erro.message });
  }
}

async function consultarProfissionalPorId(req, res) {
  try {
    const profissional = await Profissional.findByPk(req.params.id);

    if (!profissional) {
      return res.status(404).json({
        erro: 'Profissional não encontrado',
      });
    }

    res.status(200).json(profissional);
  } catch (erro) {
    res.status(500).json({ erro: erro.message });
  }
}

async function editarProfissional(req, res) {
  const id = req.params.id;

  try {
    const profissional = await Profissional.findByPk(id);

    if (!profissional) {
      return res.status(404).json({
        erro: 'Profissional não encontrado',
      });
    }

    await profissional.update(req.body);

    res.status(200).json(profissional);
  } catch (erro) {
    res.status(500).json({ erro: erro.message });
  }
}

async function excluirProfissional(req, res) {
  try {
    const profissional = await Profissional.findByPk(req.params.id);

    if (!profissional) {
      return res.status(404).json({
        erro: 'Profissional não encontrado',
      });
    }

    await profissional.destroy();

    res.status(200).json({
      mensagem: 'Profissional deletado com sucesso',
    });
  } catch (erro) {
    res.status(500).json({ erro: erro.message });
  }
}

module.exports = {
  criarProfissional,
  consultarProfissionais,
  consultarProfissionalPorId,
  editarProfissional,
  excluirProfissional,
};
