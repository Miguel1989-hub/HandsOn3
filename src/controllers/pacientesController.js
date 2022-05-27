const { Pacientes } = require("../models");

const PacientesController = {
   async listar(req, res) {
      try {
         const pacientes = await Pacientes.findAll({ where: { status: 1 } });
         res.status(200).json(pacientes);
      } catch (error) {
         console.log("Erro no servidor");
         console.error(error);
         return res.status(500).json("Erro no servidor");
      }
   },

   async listarID(req, res) {
      try {
         const { id } = req.params;
         const pacientes = await Pacientes.findByPk(id);
         if (!pacientes) {
            return res.status(404).json("Id não encontrado");
         }
         res.status(200).json(pacientes);
      } catch (error) {
         console.log("Erro no servidor");
         console.error(error);
         return res.status(500).json("Erro no servidor");
      }
   },

   async cadastrar(req, res) {
      try {
         const { nome, email, idade } = req.body;

         const count = await Pacientes.count({ where: { email } });
         if (count) {
            return res.status(400).json("Esse email já existe!");
         }

         const novoPaciente = await Pacientes.create({ nome, email, idade });

         res.status(201).json(novoPaciente);
      } catch (error) {
         console.log("Erro no servidor");
         console.error(error);
         return res.status(500).json("Erro no servidor");
      }
   },

   async atualizar(req, res) {
      try {
         const { id } = req.params;
         const { nome, email, idade } = req.body;
         let pacientes = await Pacientes.findByPk(id);

         if (!pacientes) {
            return res.status(404).json("Id não encontrado");
         }

         await Pacientes.update({ nome, email, idade }, { where: { id } });

         const pacienteAtualizado = await Pacientes.findByPk(id);
         res.status(200).json(pacienteAtualizado);
      } catch (error) {
         console.log("Erro no servidor");
         console.error(error);
         return res.status(500).json("Erro no servidor");
      }
   },

   async deletar(req, res) {
      try {
         const { id } = req.params;
         const pacientes = await Pacientes.findByPk(id);

         if (!pacientes) {
            return res.status(404).json("Id não encontrado");
         }

         await Pacientes.update({ status: 0 }, { where: { id } });

         res.status(204).json("Usuario inativo.");
      } catch (error) {
         console.log("Erro no servidor");
         console.error(error);
         return res.status(500).json("Erro no servidor");
      }
   },
};

module.exports = PacientesController;
