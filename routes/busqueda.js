/*
     Ruta: /api/todo/:busqueda
*/
const { validarToken } = require('../middlewares/validar-jwt');
const { getBusqueda, getBusquedaColeccion } = require('../controllers/busqueda');
const { Router } = require('express');
const router = Router();

router.get('/:busqueda', validarToken, getBusqueda);
router.get('/coleccion/:tabla/:busqueda', validarToken, getBusquedaColeccion);


module.exports = router;