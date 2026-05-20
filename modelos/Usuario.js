const { DataTypes } = require('sequelize');
const sequelize = require('../banco-de-dados/conexao');

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
    },

    tipo: {
      type: DataTypes.ENUM('CLIENTE', 'ADMIN'),
      allowNull: false,
    },

    status: {
      type: DataTypes.STRING(20),
      defaultValue: 'ATIVO',
    },
  },
  {
    tableName: 'usuarios',
    timestamps: false,
  }
);

module.exports = Usuario;
