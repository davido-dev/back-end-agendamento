const { DataTypes } = require('sequelize');
const sequelize = require('../banco-de-dados/conexao.js');

const ProfissionalEspecialidade = sequelize.define(
  'ProfissionalEspecialidade',
  {
    id_profissional: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
    id_especialidade: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
  },
  {
    tableName: 'profissional_especialidade',
    timestamps: false,
  },
);

module.exports = ProfissionalEspecialidade;
