const { response } = require('express');
const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const { updateImage } = require('../helpers/upload-db');

const uploadFiles = (req, res = response) => {
    const tipo = req.params.tipo;
    const id = req.params.id;
    const tiposValidos = ['hospitales', 'medicos', 'usuarios'];

    /**
     * Se valida que el tipo sea exclusivamente medicos, usuarios u hospitales
     */
    if (!tiposValidos.includes(tipo)) {
        return res.status(400).json({
            ok: false,
            msg: 'El tipo debe ser medicos, hospitales o usuarios'
        });
    }
    /* Se valida que exista algun archivo en la petición */
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            ok: false,
            msg: 'Ningun archivo seleccionado'
        });
    }

    /**
     * Proceso para subir la imagen
     */

    // Se obtiene la image

    const file = req.files.imagen;

    // Se obtiene la extension de la imagen
    const nombreCortado = file.name.split('.');
    const extension = nombreCortado[nombreCortado.length - 1];

    // Se valida la extension
    const extensionesValidas = ['jpg', 'png', 'jpeg', 'gif'];
    if (!extensionesValidas.includes(extension)) {
        return res.status(400).json({
            ok: false,
            msg: 'Extension de archivo no soportada'
        });
    }
    // Generar el nombre del archivo. Se genera un nombre aleatorio por el paquete instalado uuidv4

    const filename = `${uuidv4()}.${extension}`;

    // Path para guardar la imagen
    const path = `./uploads/${tipo}/${filename}`;


    // Mover la imagen a su respectivo path
    file.mv(path, (err) => {
        if (err) {
            console.log(err);
            return res.status(500).json({
                ok: false,
                msg: 'Error al mover la imagen a su path'
            });
        }

        // Actualizar en la base de datos el path de la imagen
        updateImage(tipo, id, filename);

        res.json({
            ok: true,
            msg: 'imagen subida',
            filename
        });
    });

}

const retornaImagen = (req, res = response) => {
    const tipo = req.params.tipo;
    const foto = req.params.foto;

    const pathImg = path.join(__dirname, `../uploads/${tipo}/${foto}`);
    if (fs.existsSync(pathImg)) {
        res.sendFile(pathImg);
    } else {
        const pathImg = path.join(__dirname, `../uploads/no-image-found.png`);
        res.sendFile(pathImg);
    }
}

module.exports = {
    uploadFiles,
    retornaImagen
}