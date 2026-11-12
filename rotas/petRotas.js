const express = require('express');
const router = express.Router();

const petControlador = require('../controladores/petControlador');

// Criar pet
router.post('/pets', petControlador.criarPet);

// Listar todos os pets
router.get('/pets', petControlador.obterPets);

// Buscar pets por ID do usuário
router.get('/pets/usuario/:id_usuario', petControlador.obterPetsPorIdUsuario);

// Buscar pet por ID
router.get('/pets/:id', petControlador.obterPetPorId);

// Atualizar pet
router.put('/pets/:id', petControlador.atualizarPet);

// Deletar pet
router.delete('/pets/:id', petControlador.deletarPet);

module.exports = router;
