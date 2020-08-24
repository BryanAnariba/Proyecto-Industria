const express = require('express');
const router = express();
const { registerUser , loginUser } = require('../controllers/auth-controller');

/*
    Que servicios web necesito

    1 - Registro de un usuario
    2 - Logueo de un usuario
    3 - Recuperacion de una cuenta
*/

router.post('/register' , registerUser);

router.post('/login' , loginUser);

module.exports = router;