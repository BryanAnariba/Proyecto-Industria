const mongoose = require('mongoose');

const articlesSchema = new mongoose.Schema({
    ownerId: {
        type: String
    },
    emailUser: {
        type: String
    },
    article: {
        type: String
    },
    description: {
        type: String
    },
    price: {
        type: String
    },
    category: {
        type: String
    },
    articlePhoto: {
        type: String
    },
} , {
    timestamps: true
});

module.exports = mongoose.model('articles-user-posted' , articlesSchema);