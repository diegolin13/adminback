/* 
     Ruta: /api/login
*/
const { Router } = require('express');
const { login } = require('../controllers/auth');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const router = Router();

router.post('/', [
    check('email', 'Obligatorio un email valido').isEmail(),
    check('password', 'La contraseña es obligatioria').not().isEmpty(),
    validarCampos
], login);

module.exports = router;