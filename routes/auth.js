/* 
     Ruta: /api/login
*/
const { Router } = require('express');
const { login, googleSignIn, renewToken } = require('../controllers/auth');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarToken } = require('../middlewares/validar-jwt');
const router = Router();

router.post('/', [
    check('email', 'Obligatorio un email valido').isEmail(),
    check('password', 'La contraseña es obligatioria').not().isEmpty(),
    validarCampos
], login);

router.post('/google', [
    check('token', 'El token de google es obligatorio').not().isEmpty(),
    validarCampos
], googleSignIn);

router.get('/renew',
    validarToken, renewToken);

module.exports = router;