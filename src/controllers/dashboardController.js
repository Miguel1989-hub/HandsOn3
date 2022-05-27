const { Psicologos, Atendimentos, Pacientes } = require('../models');

const dashboardController = {
    async listarAtendimentos(req, res) {
        try {
            const atendimento = await Atendimentos.count();
            res.json(atendimento);
        } catch (error) {
            res.status(500).json(error)
        }
    },

    async listarPacientes(req, res) {
        try {
            const paciente = await Pacientes.count();
            res.json(paciente)
        } catch (error) {
            res.status(500).json(error)
        }
    },

    async listarPsicologos(req, res) {
        try {
            const psicologo = await Psicologos.count();
            res.json(psicologo)
        } catch (error) {
            res.status(500).json(error)
        }
    },

    async listarMedia(req, res) {
        try {
            const psicologos = await Psicologos.count();
            const atendimento = await Atendimentos.count();
            const media = atendimento/psicologos
            res.json(media)
        } catch (error) {
            res.status(500).json(error)
        }
    },
};

module.exports = dashboardController;