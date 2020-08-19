const fs = require('fs');
const Usuario = require('../models/usuario');
const Medico = require('../models/medico');
const Hospital = require('../models/hospital');

const borrarImagen = (path) => {
    if (fs.existsSync(path)) {
        /* Se borra lal imagen antrior en caso de existir */
        fs.unlinkSync(path);
    }
}

const updateImage = async(tipo, id, filename) => {
    let pathViejo = '';
    switch (tipo) {
        case 'medicos':
            const medico = await Medico.findById(id);
            if (!medico) {
                console.log('No hay medico con ese id');
                return false;
            }
            /* Se evalua si el medico ya tenia una imagen antes */
            pathViejo = `./uploads/medicos/${medico.img}`;
            borrarImagen(pathViejo);

            medico.img = filename;
            await medico.save();
            return true;

            break;

        case 'hospitales':
            const hospital = await Hospital.findById(id);
            if (!hospital) {
                console.log('No hay hospital con ese id');
                return false;
            }
            /* Se evalua si el medico ya tenia una imagen antes */
            pathViejo = `./uploads/hospitales/${hospital.img}`;
            borrarImagen(pathViejo);

            hospital.img = filename;
            await hospital.save();
            return true;

            break;
        case 'usuarios':
            const usuario = await Usuario.findById(id);
            if (!usuario) {
                console.log('No hay ususario con ese id');
                return false;
            }
            /* Se evalua si el medico ya tenia una imagen antes */
            pathViejo = `./uploads/usuarios/${usuario.img}`;
            borrarImagen(pathViejo);

            usuario.img = filename;
            await usuario.save();
            return true;

            break;

        default:
            break;
    }

}

module.exports = {
    updateImage
}