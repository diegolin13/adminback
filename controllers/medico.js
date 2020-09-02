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
    const idMedico = req.params.id;
    const uid = req.uid;
    try {

        const medicoDb = await Medico.findOne({ _id: idMedico });
        if (!medicoDb) {
            return res.status(404).json({
                ok: false,
                msg: 'No se encontró un medico con el id proporcionado'
            });
        }
        const cambiosMedico = {
            ...req.body,
            usuario: uid
        }
        const medicoActualizado = await Medico.findByIdAndUpdate(idMedico, cambiosMedico, { new: true });
        res.json({
            ok: true,
            medico: medicoActualizado
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Unexpected error'
        });

    }
}

const borrarMedico = async(req, res = response) => {
    const idMedico = req.params.id;
    try {
        const medicoDb = await Medico.findOne({ _id: idMedico });
        if (!medicoDb) {
            return res.status(404).json({
                ok: false,
                msg: 'No se encontró un medico con el id proporcionado'
            });
        }
        await Medico.findOneAndDelete({ _id: medicoDb });
        res.json({
            ok: true,
            msg: 'Medico borrado'
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
    getMedico,
    createMedico,
    actualizarMedico,
    borrarMedico
}