const { DataTypes } = require('sequelize');
const sequelize = require('../banco-de-dados/conexao.js');

const Agendamento = sequelize.define(
  'Agendamento',
  {
    id_agendamento: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    data: {
      type: DataTypes.DATEONLY,
    },
    hora_inicio: {
      type: DataTypes.TIME,
    },
    status: {
      type: DataTypes.STRING(20),
    },
    observacoes: {
      type: DataTypes.TEXT,
    },
    id_usuario: {
      type: DataTypes.INTEGER,
      references: {
        model: 'usuarios',
        key: 'id_usuario',
      },
    },
    id_profissional: {
      type: DataTypes.INTEGER,
      references: {
        model: 'profissionais',
        key: 'id_profissional',
      },
    },
    id_servico: {
      type: DataTypes.INTEGER,
      references: {
        model: 'servicos',
        key: 'id_servico',
      },
    },
    id_pet: {
      type: DataTypes.INTEGER,
      references: {
        model: 'pets',
        key: 'id_pet',
      },
    },
  },
  {
    tableName: 'agendamentos',
    timestamps: false,
  }
);

module.exports = Agendamento;
