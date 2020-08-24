const express = require('express');
const router = express();
const { viewMyProfile , savePhoto } = require('../controllers/users-controller');
const { verifyToken } = require('../controllers/verify-access-token');

// Que servicios web necesito
// 1 - Entrar al perfil de mi usuario al loguearse

router.get('/profile/:userId' , verifyToken , viewMyProfile);
router.post('/profile/change-photo/:userId' , verifyToken , savePhoto);

module.exports = router;
