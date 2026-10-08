const express = require('express');
const cors = require('cors');
const app = express();

// Configuração do CORS
app.use(
  cors({
    origin: 'http://127.0.0.1:5501',
    methods: 'GET, POST, PUT, DELETE',
    allowedHeaders: 'Content-Type',
  }),
);

// Importação das rotas
const usuarioRotas = require('./rotas/usuarioRotas');
const profissionalRotas = require('./rotas/profissionalRotas');
const especialidadeRotas = require('./rotas/especialidadeRotas');
const petRotas = require('./rotas/petRotas');
const servicoRotas = require('./rotas/servicoRotas');
const profissionalEspecialidadeRotas = require('./rotas/profissionalEspecialidadeRotas');

// Inicializa conexão com banco
require('./banco-de-dados/conexao');

// Middleware
app.use(express.json());

// Rotas
app.use('/api', usuarioRotas);
app.use('/api', profissionalRotas);
app.use('/api', especialidadeRotas);
app.use('/api', petRotas);
app.use('/api', servicoRotas);
app.use('/api', profissionalEspecialidadeRotas);

// Servidor
app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});
