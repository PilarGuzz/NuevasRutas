const { Schema, model} = require('mongoose');
const { stringify } = require('nodemon/lib/utils');

const UserSchema = Schema({
    name: {
        type: String,
        required: [true, 'Name is mandatory']
    },
    email: {
        type: String,
        required: [true, 'Mail is mandatory'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Password is require'],
    },
    rol: {
        type: String,
        required: true,
        emun: ['ADMIN_ROLE', 'USER_ROLE']
    },
    status: {
        type: Boolean,
        required: true,
        enum: [true, false]
    }

    
    
})
/* Importante no usar una funcion de flechas
Crea la propiedad uid y le da el valor de _id
Se extraen del objeto User la version, contraseña y el _id para que no se guarden en el objeto user*/
UserSchema.methods.toJSON = function(){
    const { _v, password, _id, ...user} = this.toObject();
    user.uid = _id;
    return user;
}

module.exports = model( 'User', UserSchema )

