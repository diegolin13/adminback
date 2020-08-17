const jwt = require('jsonwebtoken');
const validarToken = (req, res, next) => {

    // Se obtiene el token de los headers de la peticion
    const token = req.header('x-token');

    // si no hay token se dispara el error
    if (!token) {
        return res.status(401).json({
            ok: false,
            msg: 'No hay token en la petición'
        });
    }

    // Se verifica el token

    try {
        /* Se extrae el userId del token en caso de que este sea valido */
        const { uid } = jwt.verify(token, process.env.SEED);

        /* Se manda el uid para ser utilizado como tal en el controlador */
        req.uid = uid;

        next();
    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'Token no valido'
        });

    }
}

module.exports = {
    validarToken
}