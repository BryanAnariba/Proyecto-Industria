const ctrlArticlesMethod = {};
const articlesModel = require('../models/post-articles-user');
const mongoose = require('mongoose');

ctrlArticlesMethod.uploadArticle = (req , res) => {
    const { userId } = req.params;

    const newArticle = new articlesModel({
        ownerId: mongoose.Types.ObjectId(userId) ,
        emailUser: req.body.emailUser ,
        article: req.body.article ,
        description: req.body.description ,
        price: req.body.price ,
        category: req.body.category,
        articlePhoto: 'http://localhost:3500/public/img/uploads/' + req.file.filename
    });
    newArticle.save()
    .then((success) => {
        res.send({ 
            statusCode: 1 ,
            message: 'Articulo Publicado con exito' 
        });
        res.end();
    })
    .catch((error) => {
        res.send({
            statusCode: 0 ,
            message: error
        });
        res.end();
    });

}

ctrlArticlesMethod.getArticles = (req , res) => {
    articlesModel.find()
    .then((data) => {
        res.send(data);
        res.end()
    })
    .catch((error) => {
        res.send(error);
        res.end();
    });
}

module.exports = ctrlArticlesMethod;