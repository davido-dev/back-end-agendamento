const Usuario = require('../modelos/Usuario');

// Criar usuário
exports.criarUsuario = async (req, res) => {
  try {
    const usuario = await Usuario.create(req.body);
    res.status(201).json(usuario);
  } catch (erro) {
    res.status(500).json({ erro: erro.message });
  }
};

// Listar todos
exports.obterUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.findAll();
    res.json(usuarios);
  } catch (erro) {
    res.status(500).json({ erro: erro.message });
  }
};

// Buscar por ID
exports.obterUsuarioPorId = async (req, res) => {
  try {
    const usuario = await Usuario.findByPk(req.params.id);

    if (!usuario) {
      return res.status(404).json({ erro: 'Usuário não encontrado' });
    }

    res.json(usuario);
  } catch (erro) {
    res.status(500).json({ erro: erro.message });
  }
};

// Buscar por CPF
exports.buscarUsuarioPorCpf = async (req, res) => {
  try {
    const { cpf } = req.params;

    const usuario = await Usuario.findOne({
      where: { cpf }
    });

    if (!usuario) {
      return res.status(404).json({ erro: 'Usuário não encontrado' });
    }

    res.json(usuario);
  } catch (erro) {
    res.status(500).json({ erro: erro.message });
  }
};

// Atualizar
exports.atualizarUsuario = async (req, res) => {
  try {
    const usuario = await Usuario.findByPk(req.params.id);

    if (!usuario) {
      return res.status(404).json({ erro: 'Usuário não encontrado' });
    }

    await usuario.update(req.body);
    res.json(usuario);
  } catch (erro) {
    res.status(500).json({ erro: erro.message });
  }
};

// Deletar
exports.deletarUsuario = async (req, res) => {
  try {
    const usuario = await Usuario.findByPk(req.params.id);

    if (!usuario) {
      return res.status(404).json({ erro: 'Usuário não encontrado' });
    }

    await usuario.destroy();
    res.json({ mensagem: 'Usuário removido' });
  } catch (erro) {
    res.status(500).json({ erro: erro.message });
  }
};
