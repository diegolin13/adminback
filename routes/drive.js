/**
 *  Ruta: /api/drive
 */

const { Router } = require('express');
const { postImage, getImage } = require('../controllers/drive');
const fileUpload = require('express-fileupload');
const router = Router();

router.use(fileUpload());

router.post('/', postImage);
router.get('/:foto', getImage);



module.exports = router;