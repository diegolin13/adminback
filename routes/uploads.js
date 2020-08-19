/**
 * Ruta: /api/upload
 * 
 */
const { Router } = require('express');
const { validarToken } = require('../middlewares/validar-jwt');
const { uploadFiles, retornaImagen } = require('../controllers/upload');
const fileUpload = require('express-fileupload');
const router = Router();

router.use(fileUpload());

router.put('/:tipo/:id', validarToken, uploadFiles);
router.get('/:tipo/:foto', retornaImagen);


module.exports = router;