const { Schema, model } = require('mongoose');

const UserSchema = Schema({
    nombre: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,

    },
    img: {
        type: String,
    },
    role: {
        type: String,
        required: true,
        default: 'USER_ROLE'
    },
    google: {
        type: Boolean,
        default: false
    }
});

// Metodo para que visualmente obtengamos uid en lugar _id que entrega por defecto mongoose. EN la respuesta de la peticiòn ahora no aparecerá __v, password, y el _id aparecerá como uid
UserSchema.method('toJSON', function() {
    const { __v, _id, password, ...object } = this.toObject();
    object.uid = _id;
    return object;
})

module.exports = model('Usuario', UserSchema);