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
        return res.status(500).json({
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
        return res.status(500).json({
            ok: false,
            msg: 'Unexpected error'
        });

    }

};

const actualizarHospital = async(req, res = response) => {
    const hospitalId = req.params.id;
    const uid = req.uid;
    try {
        const hospitalDB = await Hospital.findOne({ _id: hospitalId });
        if (!hospitalDB) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un hospital con el id proporcionado'
            });
        }

        // Con ayuda del operador spread, se pueden obtener todos los campos en el body de la petición, tambien se enviara el usuario que esta haciendo la actualizacion
        const cambiosHospital = {
            ...req.body,
            usuario: uid,
        }

        const hospitalActualizado = await Hospital.findByIdAndUpdate(hospitalId, cambiosHospital, { new: true });
        res.json({
            ok: true,
            msg: 'hospital actulizado',
            hospital: hospitalActualizado
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Unexpected error'
        });

    }
}

const borrarHospital = async(req, res = response) => {
    try {
        const hospitalId = req.params.id;
        const hospitaldb = await Hospital.findOne({ _id: hospitalId });
        if (!hospitaldb) {
            return res.status(404).json({
                ok: false,
                msg: 'No se encontro un hospital con el id proporcionado'
            });
        }
        await Hospital.findByIdAndDelete(hospitalId);
        res.json({
            ok: true,
            msg: 'Hospital eliminado',
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
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