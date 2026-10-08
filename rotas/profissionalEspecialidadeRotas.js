const express = require('express');

const {
  criarProfissionalEspecialidade,
  consultarProfissionaisEspecialidades,
  consultarProfissionalEspecialidadePorId,
  excluirProfissionalEspecialidade,
} = require('../controladores/profissionalEspecialidadeControlador.js');

const router = express.Router();

router.post(
  '/profissional-especialidade',
  criarProfissionalEspecialidade
);

router.get(
  '/profissional-especialidade',
  consultarProfissionaisEspecialidades
);

router.get(
  '/profissional-especialidade/:id_profissional/:id_especialidade',
  consultarProfissionalEspecialidadePorId
);

router.delete(
  '/profissional-especialidade/:id_profissional/:id_especialidade',
  excluirProfissionalEspecialidade
);

module.exports = router;
