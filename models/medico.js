const { Schema, model } = require('mongoose');

const MedicoSchema = Schema({
    nombre: {
        type: String,
        required: true
    },
    img: {
        type: String,
    },
    /* Se relaciona la colleccion de usuarios con la colleccion de hospital para saber qué usuario creo determinado hospital u hospitales */
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    hospital: {
        type: Schema.Types.ObjectId,
        ref: 'Hospital',
        required: true
    }
}, { collection: 'medicos' });

/* Se pone el nombre de hospitales a la coleccion */

//  EN la respuesta de la peticiòn ahora no aparecerá __v
MedicoSchema.method('toJSON', function() {
    const { __v, ...object } = this.toObject();
    return object;
})

module.exports = model('Medico', MedicoSchema);