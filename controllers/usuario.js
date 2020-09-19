const { response } = require('express');
const bcrypt = require('bcryptjs');
const { generarToken } = require('../helpers/jwt');
const Usuario = require('../models/usuario');

const getUsuario = async(req, res) => {
    /* Se obtiene el parametro para indicar desde qué registro se quiere obtener la data. si no hay paramtero por defecto se asigna un cero */
    const desde = Number(req.query.desde) || 0;

    // Se ejecutan dos promessas de manera simultànea para mejorar ell performance de la app. EN la variable usuarios se guardan todos los registros encontrados por el query y en total se guarda el numero total de registros de la coleccion
    const [usuarios, total] = await Promise.all([
        Usuario.find({}, 'nombre email role google img')
        .skip(desde)
        .limit(5),

        Usuario.countDocuments()
    ]);

    res.json({
        ok: true,
        users: [{
            id: 123,
            usuarios,
            total
        }]
    });
};

const createUser = async(req, res = response) => {
    const { email, password } = req.body;
    try {
        /* Validación del email duplicado */
        const emailExists = await Usuario.findOne({ email });
        if (emailExists) {
            return res.status(400).json({
                ok: false,
                msg: 'The email is already registered'
            });
        }
        /* Se crea un usuario nuevo si pasa la validación anterior */
        const user = new Usuario(req.body);

        /* Encriptar contraseña */
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(password, salt);

        /* Guardar Usuario */
        await user.save();

        /* Generar JWT */
        const token = await generarToken(user.id);

        res.json({
            ok: true,
            user,
            token

        });
    } catch (error) {
        /* Se controla el error si falla la petición */
        res.status(500).json({
            ok: false,
            msg: error
        });

    }


};

const actualizarUsuario = async(req, res = response) => {
    const uid = req.params.id;
    try {
        /* Se evalua si existe un usuario en la db con el id ingresado por url */
        const existUser = await Usuario.findById(uid);

        if (!existUser) {
            return res.status(404).json({
                ok: false,
                msg: `no existe el id0en la base de datos`
            });
        }
        /* Se guarda el cuerpo de la petición en variable campos  quitando el password, google y el email*/
        const { password, email, google, ...campos } = req.body;

        /* Se evalua si el email del body es diferente al email de la base lo que quiere decir que el usuario esta editando su correo */

        if (existUser.email !== email) {
            /* Si el usuario esta editando su correo, se valida que el nuevo correo no exista en la base */
            const emailExists = await Usuario.findOne({ email });
            if (emailExists) {
                return res.status(400).json({
                    ok: false,
                    msg: 'El usuario con el email ingresado ya existe'
                });
            }
        }

        /* Se reasigna el email a variable campos para ser enviado a la base */
        campos.email = email;

        /* Si se pasan las validaciones anteriores, se actualiza el usuario */
        const usuarioActualizado = await Usuario.findByIdAndUpdate(uid, campos, { new: true });

        res.json({
            ok: true,
            usuarioActualizado
        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        });
    }
}

const borrarUsuario = async(req, res = response) => {
    const uid = req.params.id;
    try {
        /* Se evalua si existe un usuario en la db con el id ingresado por url */
        const existUser = await Usuario.findById(uid);

        if (!existUser) {
            return res.status(404).json({
                ok: false,
                msg: `no existe el id: ${uid} en la base de datos`
            });
        }

        await Usuario.findByIdAndDelete(uid);

        res.json({
            ok: true,
            msg: `Usuario con el id: ${uid} eliminado de la base de datos de manera permanente`,
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        })
    }
}

module.exports = {
    getUsuario,
    createUser,
    actualizarUsuario,
    borrarUsuario
}