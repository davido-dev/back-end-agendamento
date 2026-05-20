const express = require('express');
const cors = require('cors');
const app = express();

// Configuração do CORS
app.use(
  cors({
    origin: 'http://127.0.0.1:5501',
    methods: 'GET, POST, PUT, DELETE',
    allowedHeaders: 'Content-Type',
  })
);

// Importação das rotas
const usuarioRotas = require('./rotas/usuarioRotas');

// Inicializa conexão com banco (efeito colateral)
require('./banco-de-dados/conexao');

// Middleware
app.use(express.json());

// Rotas
app.use('/api', usuarioRotas);

// Servidor
app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});
