const Pet = require('../modelos/Pet');
const Usuario = require('../modelos/Usuario');

// Criar pet
exports.criarPet = async (req, res) => {
  try {
    const { nome, tipo, raca, idade, id_usuario } = req.body;

    // Validação dos campos obrigatórios
    if (!nome || !tipo || !raca || idade === undefined || !id_usuario) {
      return res.status(400).json({
        erro: 'Nome, tipo, raça, idade e id_usuario são obrigatórios.'
      });
    }

    // Verifica se o usuário existe
    const usuario = await Usuario.findByPk(id_usuario);

    if (!usuario) {
      return res.status(404).json({
        erro: 'Usuário não encontrado.'
      });
    }

    // Cria o pet
    const pet = await Pet.create({
      nome,
      tipo,
      raca,
      idade,
      id_usuario
    });

    res.status(201).json(pet);

  } catch (erro) {
    console.error(erro);

    res.status(500).json({
      erro: erro.message
    });
  }
};


// Listar todos os pets
exports.obterPets = async (req, res) => {
  try {
    const pets = await Pet.findAll();

    res.json(pets);

  } catch (erro) {
    console.error(erro);

    res.status(500).json({
      erro: erro.message
    });
  }
};


// Buscar pet por ID
exports.obterPetPorId = async (req, res) => {
  try {
    const pet = await Pet.findByPk(req.params.id);

    if (!pet) {
      return res.status(404).json({
        erro: 'Pet não encontrado.'
      });
    }

    res.json(pet);

  } catch (erro) {
    console.error(erro);

    res.status(500).json({
      erro: erro.message
    });
  }
};


// Buscar pets por usuário
exports.buscarPetsPorUsuario = async (req, res) => {
  try {
    const { id_usuario } = req.params;

    // Verifica se o usuário existe
    const usuario = await Usuario.findByPk(id_usuario);

    if (!usuario) {
      return res.status(404).json({
        erro: 'Usuário não encontrado.'
      });
    }

    const pets = await Pet.findAll({
      where: { id_usuario }
    });

    res.json(pets);

  } catch (erro) {
    console.error(erro);

    res.status(500).json({
      erro: erro.message
    });
  }
};


// Atualizar pet
exports.atualizarPet = async (req, res) => {
  try {
    const pet = await Pet.findByPk(req.params.id);

    if (!pet) {
      return res.status(404).json({
        erro: 'Pet não encontrado.'
      });
    }

    const { nome, tipo, raca, idade } = req.body;

    // Validação dos campos obrigatórios
    if (!nome || !tipo || !raca || idade === undefined) {
      return res.status(400).json({
        erro: 'Nome, tipo, raça e idade são obrigatórios.'
      });
    }

    await pet.update({
      nome,
      tipo,
      raca,
      idade
    });

    res.json(pet);

  } catch (erro) {
    console.error(erro);

    res.status(500).json({
      erro: erro.message
    });
  }
};


// Deletar pet
exports.deletarPet = async (req, res) => {
  try {
    const pet = await Pet.findByPk(req.params.id);

    if (!pet) {
      return res.status(404).json({
        erro: 'Pet não encontrado.'
      });
    }

    await pet.destroy();

    res.json({
      mensagem: 'Pet removido com sucesso.'
    });

  } catch (erro) {
    console.error(erro);

    res.status(500).json({
      erro: erro.message
    });
  }
};
