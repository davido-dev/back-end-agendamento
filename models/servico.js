const { DataTypes } = require('sequelize');

const sequelize = require('../banco-de-dados/conexao.js');

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
      allowNull: false,
    },

    descricao: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    tamanho: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },

    valor_estimado: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
  },
  {
    tableName: 'servicos',
    timestamps: false,
  },
);

module.exports = Servico;
