const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String ,
        required: true
    } ,
    lastName: {
        type: String ,
        required: true
    } ,
    emailUser: {
        type: String ,
        required: true ,
        unique: true ,
        trim: true
    } ,
    passUser: {
        type: String ,
        required: true ,
        trim: true
    } ,
    photoUser: {
        required: true ,
        type: String ,
        default: 'http://localhost:3500/public/img/uploads/usuario.png'
    } ,
    photoGalleries: {
        type: Array
    }

} , {
    timestamps: true
});


// Metodos para reforzar la seguridad del sistema

// Creamos este metodo para acceder desde controlador y poder asi encriptar la clave del usuario
userSchema.methods.encryptPassword = async (passUser) => {
    // Salt con generador de 10 ciclos por defecto entre mas ciclos mejor el password
    const salt = await bcrypt.genSalt(10);

    // Retornamos el password encriptado al controlador para guardar el password del usuario ya encriptado 
    return bcrypt.hash(passUser , salt);
}

// Creamos este metodo para verificar la clave desde el formulario login
userSchema.methods.verifyPassword = async function (passUser) {

    // Funcion propia de bcrypt que compara el password de la BD con el de User y retorna bool
    const verifPassUsr = await bcrypt.compare(passUser , this.passUser);

    // Retornamos la verificacion misma de password
    return verifPassUsr;
}
module.exports = mongoose.model('users' , userSchema);