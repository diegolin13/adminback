const jwt = require('jsonwebtoken');

// Metodo para generar un jwt
const generarToken = (uid) => {

    // La logica se coloca dentro de una promesa, para poder usar el await en el controlador y asi esperar hasta que el token sea generado para poder enviar la respuesta json con el token
    return new Promise((resolve, reject) => {
        // el payload del token que contendrá el id del usuario
        const payload = {
            uid
        }

        jwt.sign(payload, process.env.SEED, {
            expiresIn: '12h'
        }, (err, token) => {
            if (err) {
                console.log(err);
                reject(err);
            } else {
                resolve(token);
            }
        });
    });
}

module.exports = {
    generarToken
};