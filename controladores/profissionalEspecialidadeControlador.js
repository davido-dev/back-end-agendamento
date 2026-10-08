const ProfissionalEspecialidade = require('../modelos/profissionalEspecialidade.js');

async function criarProfissionalEspecialidade(req, res) {
  try {
    const profissionalEspecialidade = await ProfissionalEspecialidade.create(req.body);
    res.status(201).json(profissionalEspecialidade);
  } catch (erro) {
    res.status(500).json({ erro: erro.message });
  }
}

async function consultarProfissionaisEspecialidades(req, res) {
  try {
    const dados = await ProfissionalEspecialidade.findAll();
    res.status(200).json(dados);
  } catch (erro) {
    console.log(erro);
    res.status(500).json({ erro: erro.message });
  }
}

async function consultarProfissionalEspecialidadePorId(req, res) {
  try {
    const profissionalEspecialidade = await ProfissionalEspecialidade.findOne({
      where: {
        id_profissional: req.params.id_profissional,
        id_especialidade: req.params.id_especialidade,
      },
    });

    if (!profissionalEspecialidade) {
      return res.status(404).json({
        erro: 'Relação entre profissional e especialidade não encontrada',
      });
    }

    res.status(200).json(profissionalEspecialidade);
  } catch (erro) {
    res.status(500).json({ erro: erro.message });
  }
}

async function excluirProfissionalEspecialidade(req, res) {
  try {
    const profissionalEspecialidade = await ProfissionalEspecialidade.findOne({
      where: {
        id_profissional: req.params.id_profissional,
        id_especialidade: req.params.id_especialidade,
      },
    });

    if (!profissionalEspecialidade) {
      return res.status(404).json({
        erro: 'Relação entre profissional e especialidade não encontrada',
      });
    }

    await profissionalEspecialidade.destroy();

    res.status(200).json({
      mensagem: 'Especialidade do profissional deletada com sucesso',
    });
  } catch (erro) {
    res.status(500).json({ erro: erro.message });
  }
}

module.exports = {
  criarProfissionalEspecialidade,
  consultarProfissionaisEspecialidades,
  consultarProfissionalEspecialidadePorId,
  excluirProfissionalEspecialidade,
};
