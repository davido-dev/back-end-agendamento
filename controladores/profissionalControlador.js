const Profissional = require('../modelos/Profissional');
const Usuario = require('../modelos/Usuario');
const Especialidade = require('../modelos/Especialidade');

// Criar profissional
exports.criarProfissional = async (req, res) => {
  try {
    const { id_especialidade, id_usuario, status } = req.body;

    // Validação dos campos obrigatórios
    if (!id_usuario || !id_usuario || !status) {
      return res.status(400).json({
        erro: 'Não foi possível cadastrar o usuário.',
      });
    }

    // Verifica se o usuário existe
    const usuario = await Usuario.findByPk(id_usuario);

    if (!usuario) {
      return res.status(404).json({
        erro: 'Usuário não encontrado.',
      });
    }

    const profissional = await Profissional.create({
      id_especialidade,
      id_usuario,
      status: status || 'ATIVO',
    });

    res.status(201).json(profissional);
  } catch (erro) {
    console.error(erro);
    res.status(500).json({
      erro: erro.message,
    });
  }
};

// Listar todos
exports.obterProfissionais = async (req, res) => {
  try {
    const profissionais = await Profissional.findAll({
      include: [
        {
          model: Usuario,
          as: 'Usuario',
          attributes: ['id_usuario', 'nome', 'email'],
        },
        {
          model: Especialidade,
          as: 'Especialidade',
          attributes: ['id_especialidade', 'nome'],
        },
      ],
    });

    res.json(profissionais);
  } catch (erro) {
    res.status(500).json({
      erro: erro.message,
    });
  }
};

// Buscar por ID
exports.obterProfissionalPorId = async (req, res) => {
  try {
    const profissional = await Profissional.findByPk(req.params.id);

    if (!profissional) {
      return res.status(404).json({
        erro: 'Profissional não encontrado.',
      });
    }

    res.json(profissional);
  } catch (erro) {
    res.status(500).json({
      erro: erro.message,
    });
  }
};

// Buscar por ID do usuário
exports.buscarProfissionalPorUsuario = async (req, res) => {
  try {
    const { id_usuario } = req.params;

    const profissional = await Profissional.findOne({
      where: { id_usuario },
    });

    if (!profissional) {
      return res.status(404).json({
        erro: 'Profissional não encontrado.',
      });
    }

    res.json(profissional);
  } catch (erro) {
    res.status(500).json({
      erro: erro.message,
    });
  }
};

// Atualizar
exports.atualizarProfissional = async (req, res) => {
  try {
    const profissional = await Profissional.findByPk(req.params.id);

    if (!profissional) {
      return res.status(404).json({
        erro: 'Profissional não encontrado.',
      });
    }

    const { status } = req.body;

    await profissional.update({
      status,
    });

    res.json(profissional);
  } catch (erro) {
    console.log(erro);
    res.status(500).json({
      erro: erro.message,
    });
  }
};

// Deletar
exports.deletarProfissional = async (req, res) => {
  try {
    const profissional = await Profissional.findByPk(req.params.id);

    if (!profissional) {
      return res.status(404).json({
        erro: 'Profissional não encontrado.',
      });
    }

    await profissional.destroy();

    res.json({
      mensagem: 'Profissional removido com sucesso.',
    });
  } catch (erro) {
    res.status(500).json({
      erro: erro.message,
    });
  }
};
