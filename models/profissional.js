const { DataTypes } = require('sequelize');
const sequelize = require('../banco-de-dados/conexao.js');

const Profissional = sequelize.define(
  'Profissional',
  {
    id_profissional: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    id_usuario: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
      references: {
        model: 'usuarios',
        key: 'id_usuario',
      },
    },
    status: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
  },
  {
    tableName: 'profissionais',
    timestamps: false,
  },
);

module.exports = Profissional;
