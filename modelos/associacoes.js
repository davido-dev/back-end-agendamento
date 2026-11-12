const Profissional = require('./Profissional');
const Especialidade = require('./Especialidade');
const ProfissionalEspecialidade = require('./ProfissionalEspecialidade');
const Usuario = require('./Usuario');
const Agendamento = require('./agendamento');
const Servico = require('./servico');
const Pet = require('./Pet');
const Pagamento = require('./Pagamento');

// Profissional pertence a um usuário
Profissional.belongsTo(Usuario, {
  foreignKey: 'id_usuario',
  as: 'usuario',
});

// Profissional possui várias especialidades
Profissional.belongsToMany(Especialidade, {
  through: ProfissionalEspecialidade,
  foreignKey: 'id_profissional',
  otherKey: 'id_especialidade',
  as: 'especialidades',
});

// Especialidade pertence a vários profissionais
Especialidade.belongsToMany(Profissional, {
  through: ProfissionalEspecialidade,
  foreignKey: 'id_especialidade',
  otherKey: 'id_profissional',
  as: 'profissionais',
});

// Agendamento pertence a um usuário
Agendamento.belongsTo(Usuario, {
  foreignKey: 'id_usuario',
  as: 'usuario',
});

// Agendamento pertence a um profissional
Agendamento.belongsTo(Profissional, {
  foreignKey: 'id_profissional',
  as: 'profissional',
});

// Agendamento pertence a um serviço
Agendamento.belongsTo(Servico, {
  foreignKey: 'id_servico',
  as: 'servico',
});

// Agendamento pertence a um pet
Agendamento.belongsTo(Pet, {
  foreignKey: 'id_pet',
  as: 'pet',
});

Servico.belongsTo(Especialidade, {
  foreignKey: 'id_especialidade',
});

// Pagamento pertence a um agendamento
Pagamento.belongsTo(Agendamento, {
  foreignKey: 'id_agendamento',
  as: 'agendamento',
});

// Agendamento possui um pagamento
Agendamento.hasOne(Pagamento, {
  foreignKey: 'id_agendamento',
  as: 'pagamento',
});

module.exports = {
  Profissional,
  Especialidade,
  ProfissionalEspecialidade,
  Usuario,
  Agendamento,
  Servico,
  Pet,
  Pagamento,
};
