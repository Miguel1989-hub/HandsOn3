const express = require("express");
const routes = express.Router();
const attCadastroPsicologoValidator = require('../validation/psicologos/attCadastroPsicologo')
const attCadastroPacienteValidator = require('../validation/pacientes/attCadastroPaciente');
const psicologosController = require("../controllers/psicologosController");
const pacientesController = require("../controllers/pacientesController");
const dashboardController = require("../controllers/dashboardController");
const authController = require('../controllers/authController')
const authLoginValidation = require('../validation/auth/login')
const auth = require('../middleware/auth')

const atendimentosController = require("../controllers/atendimentosController");


routes.post('/login', authLoginValidation, authController.login)

routes.get("/pacientes", pacientesController.listar);
routes.get("/pacientes/:id", pacientesController.listarID);
routes.post("/pacientes", attCadastroPacienteValidator, pacientesController.cadastrar);
routes.put("/pacientes/:id", attCadastroPacienteValidator, pacientesController.atualizar);
routes.delete("/pacientes/:id", pacientesController.deletar);

routes.get('/psicologos', psicologosController.listar)
routes.get('/psicologos/:id', psicologosController.listarID)
routes.post('/psicologos', attCadastroPsicologoValidator, psicologosController.cadastrar)
routes.put('/psicologos/:id', attCadastroPsicologoValidator, psicologosController.atualizar)
routes.delete('/psicologos/:id', psicologosController.deletar) 

routes.get("/atendimentos", atendimentosController.listar)
routes.get("/atendimentos/:id", atendimentosController.listarId)
routes.post("/atendimentos", auth, atendimentosController.criar)

routes.get("/dashboard/pacientes", dashboardController.listarPacientes)
routes.get("/dashboard/atendimentos", dashboardController.listarAtendimentos)
routes.get("/dashboard/psicologos", dashboardController.listarPsicologos)
routes.get("/dashboard/media", dashboardController.listarMedia)

module.exports = routes;