const { DataTypes } = require('sequelize');
const sequelize = require('../banco-de-dados/conexao');

const Pet = sequelize.define(
  'Pet',
  {
    id_pet: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    nome: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },

    tipo: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },

    raca: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },

    idade: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    id_usuario: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: 'pets',
    timestamps: false,
  }
);

module.exports = Pet;
