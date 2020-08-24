const express = require('express');
const router = express();
const { uploadArticle , getArticles} = require('../controllers/articles-controller');

router.post('/articles/upload-article/:userId' , uploadArticle);
router.get('/articles/list-articles' , getArticles);

module.exports = router;