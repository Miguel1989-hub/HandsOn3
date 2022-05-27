const { Psicologos } = require("../models");
const bcrypt = require("bcryptjs");

const psicologoController = {
   listar: async (req, res) => {
      try {
         const listaDePsicologos = await Psicologos.findAll({
            where: { status: 1 },
            attributes: { exclude: ["status"] },
         });
         res.status(200).json(listaDePsicologos);
      } catch (error) {
         console.log("Erro no servidor");
         console.error(error);
         return res.status(500).json("Erro no servidor");
      }
   },

   listarID: async (req, res) => {
      try {
         const { id } = req.params;
         const psicologoPorID = await Psicologos.findByPk(id, {
            attributes: { exclude: ["senha"] },
         });

         if (!psicologoPorID) {
            return res.status(404).json("Id não encontrado");
         }

         res.status(200).json(psicologoPorID);
      } catch (error) {
         console.error("Erro no servidor");
         console.log(error);
         res.status(500).json("Erro no servidor");
      }
   },

   cadastrar: async (req, res) => {
      try {
         const { nome, email, senha, apresentacao } = req.body;
         const count = await Psicologos.count({ where: { email } });

         if (count) {
            return res.status(400).json("Esse email já existe!");
         }

         const novaSenha = bcrypt.hashSync(senha, 10);
         const novoPsicologo = await Psicologos.create({
            nome,
            email,
            senha: novaSenha,
            apresentacao,
         });

         return res.status(201).json(novoPsicologo);
      } catch (error) {
         console.error("Erro no servidor");
         console.log(error);

         res.status(500).json("Erro no servidor");
      }
   },

   atualizar: async (req, res) => {
      try {
         const { id } = req.params;
         const { nome, email, senha, apresentacao } = req.body;
         
         const psicologo = await Psicologos.findByPk(id);
         if (!psicologo) {
            return res.status(404).json("Id não encontrado");
         }

         const novaSenhaAtualizada = bcrypt.hashSync(senha, 10);
         await Psicologos.update(
            {
               nome,
               email,
               senha: novaSenhaAtualizada,
               apresentacao,
            },
            {
               where: {
                  id,
               },
            }
         );

         const psicologoAtualizado = await Psicologos.findByPk(id);
         res.status(200).json(psicologoAtualizado);
      } catch (error) {
         console.error("Erro no servidor");
         console.log(error);
         res.status(500).json("Erro no servidor");
      }
   },

   deletar: async (req, res) => {
      try {
         const { id } = req.params;
         const psicologoExiste = await Psicologos.findByPk(id);

         if (!psicologoExiste) {
            return res.status(404).json("Id não encontrado");
         }

         await Psicologos.update({ status: 0 }, { where: { id } });

         return res.status(204).json();
      } catch (error) {
         console.error("Erro no servidor");
         console.log(error);
         res.status(500).json("Erro no servidor");
      }
   },
};

module.exports = psicologoController;
