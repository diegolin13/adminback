const { response } = require('express');
const Hospital = require('../models/hospital');

const getHospital = async(req, res) => {
    try {
        const hospitales = await Hospital.find().populate('usuario', 'nombre img');
        res.json({
            ok: true,
            hospitales
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Unexpected error'
        });

    }
};

const createHospital = async(req, res = response) => {
    /* Se obtiene el uid del token  */
    const uid = req.uid;

    /* Se envia el curpo de la peticion y el uid */
    const hospital = new Hospital({
        usuario: uid,
        ...req.body
    });

    try {
        const hospitalDB = await hospital.save();

        res.json({
            ok: true,
            hospital: hospitalDB
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Unexpected error'
        });

    }

};

const actualizarHospital = async(req, res = response) => {
    try {
        res.json({
            ok: true,
            msg: 'Actualizar hospital'
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Unexpected error'
        });

    }
}

const borrarHospital = async(req, res = response) => {
    try {
        res.json({
            ok: true,
            msg: 'Borrar hospital'
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Unexpected error'
        });

    }
}

module.exports = {
    getHospital,
    createHospital,
    actualizarHospital,
    borrarHospital
}