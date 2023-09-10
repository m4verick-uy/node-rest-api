const express = require('express');
const app = express();
const config = require('../properties/config');
const personController = require('./controllers/PersonController');
const mongoose = require('mongoose');



// Conexión a MongoDB desde MyContext.js
mongoose.connect(config.mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        console.log('Conexión a MongoDB establecida correctamente');
    })
    .catch((error) => {
        console.error('Error de conexión a MongoDB:', error);
        process.exit(1); // Salir del proceso con un código de error
    });

app.use(express.json());
app.use('/api', personController);

const PORT = config.port;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
