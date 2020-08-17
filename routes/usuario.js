/* 
     Ruta: /api/users
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { getUsuario, createUser, actualizarUsuario, borrarUsuario } = require('../controllers/usuario');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarToken } = require('../middlewares/validar-jwt');
const router = Router();

router.get('/', validarToken, getUsuario);

router.post('/', [
    check('nombre', 'El nombre es requerido').not().isEmpty(),
    check('password', 'El password es requerido').not().isEmpty(),
    check('email', 'Se requiere un email válido').isEmail(),
    validarCampos
], createUser);

router.put('/:id', [
    validarToken,
    check('nombre', 'El nombre es requerido').not().isEmpty(),
    check('email', 'Se requiere un email válido').isEmail(),
    check('role', 'El role es obligatorio').not().isEmpty(),
    validarCampos
], actualizarUsuario);

router.delete('/:id', validarToken, borrarUsuario);


module.exports = router;