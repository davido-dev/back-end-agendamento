const { DataTypes } = require('sequelize');
const sequelize = require('../banco-de-dados/conexao');

const Especialidade = sequelize.define(
  'Especialidade',
  {
    id_especialidade: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    nome: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
  },
  {
    tableName: 'especialidades',
    timestamps: false,
  }
);

module.exports = Especialidade;
