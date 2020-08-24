const mongoose = require('mongoose');

const { DB_HOST , DB_PORT , DB_NAME } = process.env;


// Credenciales a conectar al cluster de mongo
// BryanAriel
// asd.456
// medivshop
// `mongodb://${ DB_HOST }:${ DB_PORT }/${ DB_NAME }`


class DBConnection {
    constructor () {
        this.connectMe();
    }

    connectMe () {
        mongoose.connect(process.env.DB_URI, {
            useUnifiedTopology: true ,
            useNewUrlParser: true ,
            useCreateIndex: true
        })
        .then((successConnecction) => {
            console.log('MediVShop Data Base is running successfully');
        })
        .catch((error) => {
            console.log(error);
        });
    }
}

module.exports = new DBConnection;