const authMethods = {};
const userModel = require('../models/users-model');
const jwt = require('jsonwebtoken');


// 1 - Registro de un usuario
authMethods.registerUser = async (req , res) => {

    // Recogemos los parametros del usuario en la peticion
    const { firstName , lastName , emailUser , passUser } = req.body;
    

    // Armamos el usuario a guardar
    let newUser = new userModel({
        firstName: firstName ,
        lastName: lastName ,
        emailUser: emailUser ,
        passUser: passUser
    });

    // Primero encriptamos al password antes del guardar
    newUser.passUser = await newUser.encryptPassword(passUser);

    // Procedemos a guardar el usuario
    newUser.save()
    .then((success) => { // Si la promesa tuvo exito
        res.send({
            statusCode: 1 ,
            newUser: 'Email: ' + success.emailUser ,
            message: 'Su cuenta fue registrada exitosamente'
        });
        res.end();
    })
    .catch((error) => { // Hubo error, depurar sin que caiga la aplicacion
        if (error.code === 11000) {
            res.send({
                statusCode: 0 ,
                user: 'El correo ' + emailUser ,
                message: ' ya se encuentra en uso'
            });
            res.end();
        } else {
            res.send(error);
            res.end();
        }
    });
}

// 2 - Logueo de un usuario
authMethods.loginUser = (req , res) => {
    
    // Primeramente recogemos los parametros 
    const { emailUser , passUser } = req.body;
    // Despues realizamos la busqueda
    userModel.find({ emailUser: emailUser })
    .then((userData) => {
        if (!userData[0]) { // Si el usuario no existe
            res.send({
                statusCode: 0 ,
                user: 'El usuario con email ' + emailUser ,
                message: 'No existe'
            });
            res.end();
        } else { // Si el usuario existe

            // Verificar que las credenciales coinciden
            userData[0].verifyPassword(passUser)
            .then((success) => {
                if (!success) { // Si la verificacion retorna false
                    res.send({
                        statusCode: 0 ,
                        message: 'Clave incorrecta, vuelva a digitar la clave nuevamente'
                    });
                    res.end();
                } else { // Si la verificacion retorna true
                    // 1 - Generamos el token de acceso con duracion de 5 horas
                    const token = jwt.sign({ id: userData[0]._id } , process.env.SECURE_KEY , { expiresIn: 60*60*5 });

                    if (!token) { // Si el token no se genero correctamente
                        res.send({
                            statusCode: 0 ,
                            message: 'Ha ocurrido un error mientras se generaba el token, vuelva a intentarlo mas tarde'
                        });
                        res.end();
                    } else { // Caso contrario si el token se genero correctamente
                        res.send({
                            statusCode: 1 ,
                            accessToken: token ,
                            emailUser: userData[0].emailUser ,
                            idUser: userData[0]._id
                        });
                        res.end();
                    }

                }
            })
            .catch((error) => {
                res.send(error);
                res.end();
            });
        }
    })
    .catch((error) => {
        res.send(error);
        res.end();
    });

}

module.exports = authMethods;