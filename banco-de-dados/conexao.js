// Importa a classe Sequelize da biblioteca sequelize
const { Sequelize } = require('sequelize');

// Cria uma nova conexão com o banco de dados
const sequelize = new Sequelize('pet_show', 'root', 'root', {

  // Endereço do servidor do banco
  host: 'localhost',

  // Define o banco utilizado
  dialect: 'mysql',

  // Configurações de pool de conexões
  pool: {

    // Número máximo de conexões abertas
    max: 10,

    // Número mínimo de conexões mantidas
    min: 0,

    // Tempo máximo para tentar conexão (em ms)
    acquire: 30000,

    // Tempo máximo que uma conexão pode ficar ociosa
    idle: 10000,
  },

  // Desativa logs SQL no terminal
  logging: false,
});

// Função assíncrona para testar a conexão
async function testConnection() {

  try {

    // Tenta autenticar a conexão com o banco
    await sequelize.authenticate();

    // Exibe mensagem de sucesso
    console.log('Conexão com o MySQL estabelecida com sucesso!');

  } catch (error) {

    // Exibe mensagem de erro caso a conexão falhe
    console.error('Erro ao conectar com o MySQL: ', error);
  }
}

// Executa o teste de conexão
testConnection();

// Exporta a conexão para ser usada em outros arquivos
module.exports = sequelize;
