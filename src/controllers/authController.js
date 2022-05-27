const { Psicologos } = require('../models/index')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const secret = require('../config/secret')

const AuthController = {
    login: async (req, res) => {
        const { email, senha } = req.body

        const usuario = await Psicologos.findOne({
            where: {
                email
            }
        })

        if(!usuario){
            return res.status(401).json("E-mail ou senha inválido, verifique e tente novamente")
        }

        if(!bcrypt.compareSync(senha, usuario.senha)){
            return res.status(401).json("E-mail ou senha inválido, verifique e tente novamente")
        }

        const token = jwt.sign({
            id: usuario.id, 
            email: usuario.email,
            nome: usuario.nome},
            secret.key
         )

        return res.json(token)


    }
}

module.exports = AuthController