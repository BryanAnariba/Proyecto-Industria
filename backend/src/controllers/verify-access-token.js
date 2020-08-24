const jwt = require('jsonwebtoken');

const verifcation = {
    verifyToken
};

// Funcion que verifica tokens
function verifyToken (req , res , next) {
    // Extraemos el token de los headers de una aplicacion web
    const token = req.headers['x-access-token'];

    // Si el token es indefinido o es un string vacio o no viene nigun token en la cabecera
    if ((token === undefined) || (token === null) || (token === "")) {
        res.send({
            statusCode: 1 , 
            error: 'No cuentas con un token de acceso' ,
            message: 'Necesitas un token para acceder al sistema'
        });
        res.end();
    } else { // Caso contrario si hay algo en el request o cabecera
        // 1 - primero verificamos si es un token
        const verifTokenAuth = jwt.verify(token , process.env.SECURE_KEY);

        if (!verifTokenAuth) { // Si la verificacion retorna false
            res.send({
                statusCode: 0 ,
                error: 'Token de acceso incorrecto' ,
                message: 'Necesitas un token de acceso para entrar'
            });
            res.end();
        } else { // Caso contrario si la verificacion retorna true
            req.userId = verifTokenAuth.id; // extraemos el id de token
            next(); //  Continuamos con la ejecucion
        }
    }
    
}

module.exports = verifcation;
