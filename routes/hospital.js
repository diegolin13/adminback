/* 
     Ruta: /api/hospital
*/
const { Router } = require('express');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarToken } = require('../middlewares/validar-jwt');
const { getHospital, createHospital, actualizarHospital, borrarHospital } = require('../controllers/hospital');
const { check } = require('express-validator');
const router = Router();

router.get('/', validarToken, getHospital);

router.post('/', [
    validarToken,
    check('nombre', 'El nombre del hospital es requerido').not().isEmpty(),
    validarCampos
], createHospital);

router.put('/:id', [], actualizarHospital);

router.delete('/:id', borrarHospital);


module.exports = router;