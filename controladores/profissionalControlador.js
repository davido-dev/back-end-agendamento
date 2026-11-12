const Usuario = require('../modelos/Usuario');

const { Profissional, Especialidade } = require('../modelos/associacoes');

// Relacionamentos utilizados nas consultas
const incluirRelacionamentos = [
  {
    model: Usuario,
    as: 'usuario',
    attributes: ['id_usuario', 'nome', 'email'],
  },
  {
    model: Especialidade,
    as: 'especialidades',
    through: { attributes: [] },
  },
];

// Criar profissional
exports.criarProfissional = async (req, res) => {
  try {
    const { id_usuario, id_especialidades = [], status = 'ATIVO' } = req.body;

    const usuario = await Usuario.findByPk(id_usuario);

    if (!usuario) {
      return res.status(404).json({
        erro: 'Usuário não encontrado.',
      });
    }

    const profissional = await Profissional.create({
      id_usuario,
      status,
    });

    if (id_especialidades.length > 0) {
      await profissional.setEspecialidades(id_especialidades);
    }

    const resultado = await Profissional.findByPk(profissional.id_profissional, {
      include: incluirRelacionamentos,
    });

    return res.status(201).json(resultado);
  } catch (erro) {
    console.error(erro);

    return res.status(500).json({
      erro: erro.message,
    });
  }
};

// Listar todos os profissionais
exports.obterProfissionais = async (req, res) => {
  try {
    const profissionais = await Profissional.findAll({
      include: incluirRelacionamentos,
    });

    return res.json(profissionais);
  } catch (erro) {
    console.error(erro);

    return res.status(500).json({
      erro: erro.message,
    });
  }
};

// Buscar profissional por ID
exports.obterProfissionalPorId = async (req, res) => {
  try {
    const profissional = await Profissional.findByPk(req.params.id, {
      include: incluirRelacionamentos,
    });

    if (!profissional) {
      return res.status(404).json({
        erro: 'Profissional não encontrado.',
      });
    }

    return res.json(profissional);
  } catch (erro) {
    console.error(erro);

    return res.status(500).json({
      erro: erro.message,
    });
  }
};

// Buscar profissional pelo ID do usuário
exports.buscarProfissionalPorUsuario = async (req, res) => {
  try {
    const profissional = await Profissional.findOne({
      where: {
        id_usuario: req.params.id_usuario,
      },
      include: incluirRelacionamentos,
    });

    if (!profissional) {
      return res.status(404).json({
        erro: 'Profissional não encontrado.',
      });
    }

    return res.json(profissional);
  } catch (erro) {
    console.error(erro);

    return res.status(500).json({
      erro: erro.message,
    });
  }
};

// Atualizar profissional
exports.atualizarProfissional = async (req, res) => {
  try {
    const profissional = await Profissional.findByPk(req.params.id);

    if (!profissional) {
      return res.status(404).json({
        erro: 'Profissional não encontrado.',
      });
    }

    const { status, id_especialidades } = req.body;

    if (status !== undefined) {
      await profissional.update({ status });
    }

    if (id_especialidades !== undefined) {
      await profissional.setEspecialidades(id_especialidades);
    }

    const atualizado = await Profissional.findByPk(req.params.id, {
      include: incluirRelacionamentos,
    });

    return res.json(atualizado);
  } catch (erro) {
    console.error(erro);

    return res.status(500).json({
      erro: erro.message,
    });
  }
};

// Excluir profissional
exports.deletarProfissional = async (req, res) => {
  try {
    const profissional = await Profissional.findByPk(req.params.id);

    if (!profissional) {
      return res.status(404).json({
        erro: 'Profissional não encontrado.',
      });
    }

    await profissional.setEspecialidades([]);
    await profissional.destroy();

    return res.json({
      mensagem: 'Profissional removido com sucesso.',
    });
  } catch (erro) {
    console.error(erro);

    return res.status(500).json({
      erro: erro.message,
    });
  }
};
