const ctrlUserMethods = {};
const userModel = require('../models/users-model');
const mongoose = require('mongoose');

ctrlUserMethods.viewMyProfile = (req , res) => {
    const { userId } = req.params;

    userModel.find({ _id: userId } , { firstName: true , lastName: true , emailUser: true , photoUser: true })
    .then((userData) => {
        if (!userData[0]) {
            res.send({
                statusCode: 0 ,
                error: 'No Encontrado' ,
                message: 'El usuario no existe'
            });
            res.end();
        } else {
            res.send(userData);
            res.end()
        }
    });
}

ctrlUserMethods.viewPostUsers = (req , res) => {
    
}

ctrlUserMethods.savePhoto = (req , res) => {
    const { userId } = req.params;
    userModel.updateOne({ _id: userId } , {
        $set: {
            photoUser: 'http://localhost:3500/public/img/uploads/' + req.file.filename 

        } ,
        $push: {
            photoGalleries: {
                _id: mongoose.Types.ObjectId() ,
                filename: req.file.filename,
                photoUser: 'http://localhost:3500/public/img/uploads/' + req.file.filename  ,
                originalname: req.file.originalname,
                mimetype: req.file.mimetype,
                size: req.file.size,  
            }  
        }
    })
    .then((success) => {
        res.send({
            statusCode: 1 ,
            message: 'Cambios realizados con exito'
        });
        res.end();
    })
    .catch((error) => {
        res.send(error);
        res.end();
    });
}

module.exports = ctrlUserMethods;
