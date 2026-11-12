const Pet = require('../modelos/pet');

// Criar pet
exports.criarPet = async (req, res) => {
  try {
    const { nome, tipo, raca, idade, id_usuario } = req.body;

    if (!nome || !tipo || idade === undefined || !id_usuario) {
      return res.status(400).json({
        erro: 'Nome, tipo, idade e usuário são obrigatórios.',
      });
    }

    const pet = await Pet.create({
      nome,
      tipo,
      raca,
      idade,
      id_usuario,
    });

    res.status(201).json(pet);
  } catch (erro) {
    console.error(erro);

    res.status(500).json({
      erro: erro.message,
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
      erro: erro.message,
    });
  }
};

// Buscar pet por ID
exports.obterPetPorId = async (req, res) => {
  try {
    const pet = await Pet.findByPk(req.params.id);

    if (!pet) {
      return res.status(404).json({
        erro: 'Pet não encontrado.',
      });
    }

    res.json(pet);
  } catch (erro) {
    console.error(erro);

    res.status(500).json({
      erro: erro.message,
    });
  }
};


exports.obterPetsPorIdUsuario = async (req, res) => {
  try {
    const { id_usuario } = req.params;

    const pets = await Pet.findAll({
      where: { id_usuario }
    });

    return res.status(200).json(pets);
  } catch (error) {
    return res.status(500).json({
      erro: 'Erro ao buscar pets',
      detalhes: error.message
    });
  }
};


// Atualizar pet
exports.atualizarPet = async (req, res) => {
  try {
    const pet = await Pet.findByPk(req.params.id);

    if (!pet) {
      return res.status(404).json({
        erro: 'Pet não encontrado.',
      });
    }

    const { nome, tipo, raca, idade, id_usuario } = req.body;

    if (!nome || !tipo || idade === undefined || !id_usuario) {
      return res.status(400).json({
        erro: 'Nome, tipo, idade e usuário são obrigatórios.',
      });
    }

    await pet.update({
      nome,
      tipo,
      raca,
      idade,
      id_usuario,
    });

    res.json(pet);
  } catch (erro) {
    console.error(erro);

    res.status(500).json({
      erro: erro.message,
    });
  }
};

// Deletar pet
exports.deletarPet = async (req, res) => {
  try {
    const pet = await Pet.findByPk(req.params.id);

    if (!pet) {
      return res.status(404).json({
        erro: 'Pet não encontrado.',
      });
    }

    await pet.destroy();

    res.json({
      mensagem: 'Pet removido com sucesso.',
    });
  } catch (erro) {
    console.error(erro);

    res.status(500).json({
      erro: erro.message,
    });
  }
};
