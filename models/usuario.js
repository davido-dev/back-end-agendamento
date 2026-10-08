const { DataTypes } = require('sequelize');
const sequelize = require('../banco-de-dados/conexao.js');

const Usuario = sequelize.define(
  'Usuario',
  {
    id_usuario: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nome: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    cpf: {
      type: DataTypes.STRING(14),
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
    },
    senha: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    telefone: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    tipo: {
      type: DataTypes.ENUM('CLIENTE', 'ADMIN', 'PROFISSIONAL'),
      allowNull: false,
      defaultValue: 'CLIENTE',
    },
    status: {
      type: DataTypes.STRING(20),
      defaultValue: 'ATIVO',
    },
  },
  {
    tableName: 'usuarios',
    timestamps: false,
  },
);

module.exports = Usuario
