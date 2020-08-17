const { response } = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/usuario');
const { generarToken } = require('../helpers/jwt');

const login = async(req, res = response) => {
    const { email, password } = req.body;
    try {
        /* Se valida que el correo ingresado por el usuario este reistrado en la base */
        const usuarioDB = await User.findOne({ email });
        if (!usuarioDB) {
            return res.status(500).json({
                ok: false,
                msg: '(correo) o contraseña incorrectos'
            });
        }


        /*  Se compara la contraseña ingresada con la contraseña en base */
        const validPassword = bcrypt.compareSync(password, usuarioDB.password);
        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'correo o (contraseña) incorrectos'
            });
        }

        /* Se genera el jwt al pasar las validaciones anteriores*/
        const token = await generarToken(usuarioDB.id);

        res.json({
            ok: true,
            usuarioDB,
            token
        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error inseperado, contactar con TI'
        });
    }
}

module.exports = {
    login
}