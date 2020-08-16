/* 
     Ruta: /api/users
*/
const { Router } = require('express');
const { getUsuario, createUser } = require('../controllers/usuario');
const router = Router();

router.get('/', getUsuario);
router.post('/', createUser);


module.exports = router;