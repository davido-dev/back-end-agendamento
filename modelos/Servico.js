const { DataTypes } = require('sequelize');
const sequelize = require('../banco-de-dados/conexao');

const Servico = sequelize.define(
  'Servico',
  {
    id_servico: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    nome: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },

    descricao: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    duracao_minutos: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },

    valor: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
    },

    status: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
  },
  {
    tableName: 'servicos',
    timestamps: false,
  }
);

module.exports = Servico;
