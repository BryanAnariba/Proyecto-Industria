require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');

require('./config/mongoDB-connection');

// Settings

const app = express();
app.set('port' , process.env.BACKEND_PORT || 3600);



// Middlewares
app.use(cors({ origin: `${ process.env.PLATFORM_HOST }:${ process.env.FRONTEND_PORT }` }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const storage = multer.diskStorage({// Instanciamos para poder permitir cierto formato de archivos
    // 1 - Destino a donde guardar las imagenes
    destination: path.join(__dirname , 'public/img/uploads') ,

    // 2 - Configuramos las extenciones permitidas
    filename: (req , file , cb , filename) => {

        // 3 - Callback con el nombre a guardar de la imagen en este caso -> parametro uuid.extencion
        cb(null , `${ uuidv4() }.${ file.mimetype.split('/')[1] }`);
    }
});
app.use(multer({
    storage: storage
}).single('file'));

// Routes
app.use('/auth' , require('./routes/auth-routes'));
app.use('/users' , require('./routes/users-routes'));
app.use('/publications' , require('./routes/post-articles-routes'));
app.use('/sales' , require('./routes/users-sales-routes'));

// Static Files
app.use('*uploads' , express.static(path.join(__dirname , 'public/img/uploads')));

// Global Variables

// Starting Server
app.listen(app.get('port') , () => {
    console.log('MediVShop server started on port -> ' + app.get('port'));
});

