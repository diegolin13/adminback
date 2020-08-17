const { response } = require('express');
const { validationResult } = require('express-validator');

const validarCampos = (req, res = response, next) => {
    /* Se controlan los errores generados por express-validator los cuales son configurados en routes/usuario.js */
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
        return res.status(400).json({
            ok: false,
            err: errores.mapped()
        });
    }

    next();
}

module.exports = {
    validarCampos
}