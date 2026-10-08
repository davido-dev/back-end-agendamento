const { DataTypes } = require('sequelize');
const sequelize = require('../banco-de-dados/conexao.js');
const Usuario = require('./usuario.js');
const Especialidade = require('./especialidade.js');

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
    },

    id_especialidade: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    status: {
      type: DataTypes.STRING(20),
      defaultValue: 'ATIVO',
    },
  },
  {
    tableName: 'profissionais',
    timestamps: false,
  },
);

Profissional.belongsTo(Usuario, {
  foreignKey: 'id_usuario',
  as: 'Usuario',
});

Profissional.belongsTo(Especialidade, {
  foreignKey: 'id_especialidade',
  as: 'Especialidade',
});

module.exports = Profissional;
