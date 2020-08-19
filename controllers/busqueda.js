const { response } = require('express');
const Usuario = require('../models/usuario');
const Hospital = require('../models/hospital');
const Medico = require('../models/medico');

const getBusqueda = async(req, res = response) => {
    const parametro = req.params.busqueda;
    /* Se aplica una expresion regular para que la busqueda sea flexible y no sea sensitiva a mayusculas espacios etc */
    const regex = new RegExp(parametro, 'i');
    try {
        //    const usuarios = await Usuario.find({ nombre: regex });
        const [usuarios, hospitales, medicos] = await Promise.all([
            Usuario.find({ nombre: regex }),
            Hospital.find({ nombre: regex }),
            Medico.find({ nombre: regex }),
        ]);
        res.json({
            ok: true,
            usuarios,
            hospitales,
            medicos
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}

const getBusquedaColeccion = async(req, res = response) => {
    const tabla = req.params.tabla;
    const parametro = req.params.busqueda;
    /* Se aplica una expresion regular para que la busqueda sea flexible y no sea sensitiva a mayusculas espacios etc */
    const regex = new RegExp(parametro, 'i');
    let data = [];
    switch (tabla) {
        case 'usuarios':
            data = await Usuario.find({ nombre: regex });
            break;
        case 'hospitales':
            data = await Hospital.find({ nombre: regex })
                .populate('usuario', 'nombre img');
            break;
        case 'medicos':
            data = await Medico.find({ nombre: regex })
                .populate('usuario', 'nombre img')
                .populate('hospital', 'nombre img');
            break;


        default:
            return res.status(404).json({
                ok: false,
                msg: `No existe la colecciòn ${tabla}`
            });
    }

    res.json({
        ok: true,
        data
    })
}

module.exports = {
    getBusqueda,
    getBusquedaColeccion
}