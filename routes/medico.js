/* 
     Ruta: /api/medico
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarToken } = require('../middlewares/validar-jwt');
const {
    getMedico,
    createMedico,
    actualizarMedico,
    borrarMedico
} = require('../controllers/medico');
const router = Router();

router.get('/', validarToken, getMedico);

router.post('/', [
    validarToken,
    check('nombre', 'Es requerido el nombre del medico').not().isEmpty(),
    check('hospital', 'Es requerido asignar un hospital u hospitales al medico').isMongoId(),
    validarCampos

], createMedico);

router.put('/:id', [
    validarToken,
    check('nombre', 'Es requerido el nombre del medico').not().isEmpty(),
    check('hospital', 'El id de hospital no es de tipo mongoId').isMongoId(),
    validarCampos
], actualizarMedico);

router.delete('/:id', validarToken, borrarMedico);


module.exports = router;