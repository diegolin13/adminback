const { response } = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/usuario');
const { generarToken } = require('../helpers/jwt');
const { googleVerify } = require('../helpers/google-verify');

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

const googleSignIn = async(req, res = response) => {
    const googleToken = req.body.token;
    try {
        const { name, email, picture } = await googleVerify(googleToken);
        const usuarioDB = await User.findOne({ email });
        let usuario;
        if (!usuarioDB) {
            // Si no existe un usuario, se creara uno nuevo con la data proporcionada por google
            usuario = new User({
                nombre: name,
                email,
                password: '@@@',
                img: picture,
                google: true
            });
        } else {
            // En este punto el usuario ya se había registrado pero despues opto por la autenticacion por google
            usuario = usuarioDB;
            usuario.google = true;
        }

        // Guardar usuario actualizado

        await usuario.save();

        // GEnerar jwt
        const token = await generarToken(usuario.id);

        res.json({
            ok: true,
            token
        });
    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'El token no es válido'
        });
    }

}

const renewToken = async(req, res = response) => {
    const uid = req.uid;
    const token = await generarToken(uid);

    res.json({
        ok: true,
        token
    });
}

module.exports = {
    login,
    googleSignIn,
    renewToken
}