const { response } = require('express');
const Medico = require('../models/medico');

const getMedico = async(req, res) => {
    try {
        const medicos = await Medico.find()
            .populate('usuario', 'nombre img')
            .populate('hospital', 'nombre img');
        res.json({
            ok: true,
            medicos
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Unexpected error'
        });

    }
};

const createMedico = async(req, res = response) => {
    const uid = req.uid;
    const medico = new Medico({
        usuario: uid,
        ...req.body
    });
    try {
        const medicoDB = await medico.save();
        res.json({
            ok: true,
            msg: 'Médico creado',
            medicoDB
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Unexpected error'
        });

    }

};

const actualizarMedico = async(req, res = response) => {
    try {
        res.json({
            ok: true,
            msg: 'Actualizar Medico'
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Unexpected error'
        });

    }
}

const borrarMedico = async(req, res = response) => {
    try {
        res.json({
            ok: true,
            msg: 'Borrar Medico'
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Unexpected error'
        });

    }
}

module.exports = {
    getMedico,
    createMedico,
    actualizarMedico,
    borrarMedico
}