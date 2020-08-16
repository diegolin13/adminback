const Usuario = require('../models/usuario');
const getUsuario = async(req, res) => {
    const usuarios = await Usuario.find({}, 'nombre email role google');
    res.json({
        ok: true,
        users: [{
            id: 123,
            usuarios
        }]
    });
};

const createUser = async(req, res) => {
    const { nombre, email, password } = req.body;
    const user = new Usuario(req.body);
    await user.save();
    res.json({
        ok: true,
        users: [{
            id: 123,
            bod: req.body
        }]
    });
};

module.exports = {
    getUsuario,
    createUser
}