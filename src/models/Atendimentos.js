const db = require("../database");
const { DataTypes } = require("sequelize");

const Pacientes = require("./Pacientes");
const Psicologos = require("./Psicologos");

const Atendimentos = db.define(
   "Atendimentos",
   {
      id: {
         type: DataTypes.INTEGER,
         primaryKey: true,
         autoIncrement: true,
      },
      data_atendimento: {
         type: DataTypes.DATE,
      },
      observacao: {
         type: DataTypes.STRING,
      },
      psicologo_id: {
         type: DataTypes.INTEGER,
         references: {
            model: Psicologos,
            key: "id",
         },
      },
      paciente_id: {
         type: DataTypes.INTEGER,
         references: {
            model: Pacientes,
            key: "id",
         },
      },
   },
   {
      tableName: "atendimentos",
   }
);

module.exports = Atendimentos;
