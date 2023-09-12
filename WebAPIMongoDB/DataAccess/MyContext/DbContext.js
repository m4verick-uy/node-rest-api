const mongoose = require('mongoose');
const config = require('../../Properties/config');

const url = config.mongoURL;

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

mongoose.connect(url, options)
    .then(() => {
        console.log('Conexión a MongoDB establecida correctamente');
    })
    .catch((error) => {
        console.error('Error de conexión a MongoDB:', error);
        process.exit(1);
    });
