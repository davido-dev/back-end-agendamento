const Especialidade = require('../modelos/especialidade.js');

// Criar especialidade
exports.criarEspecialidade = async (req, res) => {
  try {
    const { nome } = req.body;

    // Validação do campo obrigatório
    if (!nome) {
      return res.status(400).json({
        erro: 'O nome da especialidade é obrigatório.'
      });
    }

    // Verifica se já existe uma especialidade com o mesmo nome
    const existente = await Especialidade.findOne({
      where: { nome }
    });

    if (existente) {
      return res.status(400).json({
        erro: 'Esta especialidade já está cadastrada.'
      });
    }

    const especialidade = await Especialidade.create({
      nome
    });

    res.status(201).json(especialidade);

  } catch (erro) {
    console.error(erro);

    res.status(500).json({
      erro: erro.message
    });
  }
};


// Listar todas
exports.obterEspecialidades = async (req, res) => {
  try {
    const especialidades = await Especialidade.findAll();

    res.json(especialidades);

  } catch (erro) {
    console.error(erro);

    res.status(500).json({
      erro: erro.message
    });
  }
};


// Buscar por ID
exports.obterEspecialidadePorId = async (req, res) => {
  try {
    const especialidade = await Especialidade.findByPk(req.params.id);

    if (!especialidade) {
      return res.status(404).json({
        erro: 'Especialidade não encontrada.'
      });
    }

    res.json(especialidade);

  } catch (erro) {
    console.error(erro);

    res.status(500).json({
      erro: erro.message
    });
  }
};


// Atualizar
exports.atualizarEspecialidade = async (req, res) => {
  try {
    const especialidade = await Especialidade.findByPk(req.params.id);

    if (!especialidade) {
      return res.status(404).json({
        erro: 'Especialidade não encontrada.'
      });
    }

    const { nome } = req.body;

    // Validação
    if (!nome) {
      return res.status(400).json({
        erro: 'O nome da especialidade é obrigatório.'
      });
    }

    // Verifica se outro registro já possui o mesmo nome
    const existente = await Especialidade.findOne({
      where: { nome }
    });

    if (existente && existente.id_especialidade !== especialidade.id_especialidade) {
      return res.status(400).json({
        erro: 'Já existe outra especialidade com este nome.'
      });
    }

    await especialidade.update({
      nome
    });

    res.json(especialidade);

  } catch (erro) {
    console.error(erro);

    res.status(500).json({
      erro: erro.message
    });
  }
};


// Deletar
exports.deletarEspecialidade = async (req, res) => {
  try {
    const especialidade = await Especialidade.findByPk(req.params.id);

    if (!especialidade) {
      return res.status(404).json({
        erro: 'Especialidade não encontrada.'
      });
    }

    await especialidade.destroy();

    res.json({
      mensagem: 'Especialidade removida com sucesso.'
    });

  } catch (erro) {
    console.error(erro);

    res.status(500).json({
      erro: erro.message
    });
  }
};
