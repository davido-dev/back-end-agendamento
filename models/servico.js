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
    duracao_minutos: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    valor: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING(20),
      defaultValue: 'ATIVO',
    },
  },
  {
    tableName: 'servicos',
    timestamps: false,
  },
);

module.exports = Servico;
