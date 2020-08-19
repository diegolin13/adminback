const { Schema, model } = require('mongoose');

const HospitalSchema = Schema({
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
    }
}, { collection: 'hospitales' });

/* Se pone el nombre de hospitales a la coleccion */

// Metodo para que visualmente obtengamos uid en lugar _id que entrega por defecto mongoose. EN la respuesta de la peticiòn ahora no aparecerá __v, password, y el _id aparecerá como uid
HospitalSchema.method('toJSON', function() {
    const { __v, ...object } = this.toObject();
    return object;
})

module.exports = model('Hospital', HospitalSchema);