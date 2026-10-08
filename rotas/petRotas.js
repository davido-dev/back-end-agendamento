const express = require('express');

const roteador = express.Router();

const petControlador = require('../controladores/petControlador.js');

roteador.get('/pets', petControlador.obterPets);

roteador.get('/pets/:id', petControlador.obterPetPorId);

roteador.get('/pets/usuario/:id_usuario', petControlador.buscarPetsPorUsuario);

roteador.post('/pets', petControlador.criarPet);

roteador.put('/pets/:id', petControlador.atualizarPet);

roteador.delete('/pets/:id', petControlador.deletarPet);

module.exports = roteador;
