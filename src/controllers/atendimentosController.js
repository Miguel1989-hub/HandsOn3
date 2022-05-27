const { Atendimentos, Pacientes, Psicologos } = require("../models");

const AtendimentosController = {
   async listar(req, res) {
      try {
         const atendimentos = await Atendimentos.findAll({
            include: [
               { model: Pacientes, attributes: { exclude: ["status"] } },
               {
                  model: Psicologos,
                  attributes: { exclude: ["senha", "status"] },
               },
            ],
         });
         res.status(200).json(atendimentos);
      } catch (error) {
         console.log("Erro no servidor");
         console.error(error);
         return res.status(500).json("Erro no servidor");
      }
   },

   async listarId(req, res) {
      try {
         const { id } = req.params;
         const atendimentos = await Atendimentos.findOne({
            where: { id },
            include: [
               { model: Pacientes, attributes: { exclude: ["status"] } },
               {
                  model: Psicologos,
                  attributes: { exclude: ["senha", "status"] },
               },
            ],
         });

         if (!atendimentos) {
            return res.status(404).json("Id não encontrado");
         }

         res.status(200).json(atendimentos);
      } catch (error) {
         console.log("Erro no servidor");
         console.error(error);
         return res.status(500).json("Erro no servidor");
      }
   },

   async criar(req, res) {
      try {
         const { paciente_id, data_atendimento, observacao } = req.body;
         const { id } = req.auth;
         const novoAtendimento = await Atendimentos.create({
            paciente_id,
            psicologo_id: id,
            data_atendimento,
            observacao,
         });

         res.status(201).json(novoAtendimento);
      } catch (error) {
         console.log("Erro no servidor");
         console.error(error);
         return res.status(500).json("Erro no servidor");
      }
   },
};

module.exports = AtendimentosController;
