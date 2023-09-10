const mongoose = require('mongoose');
const config = require('../../Properties/config');

const url = config.mongoURL;

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

mongoose.connect(url, options)
    .then(async () => {
        console.log('Conexión a MongoDB establecida correctamente');

        // Crear una nueva colección (tabla) llamada "miColeccion"
        const PersonaSchema = new mongoose.Schema({
            nombre: String,
            edad: Number,
            email: String,
            // Define otros campos según tus necesidades
        });

        // Crea el modelo basado en el esquema
        const persons = mongoose.model('persons', PersonaSchema);

        // Utiliza el modelo para interactuar con la colección
        const nuevoDocumento = new persons({
            nombre: 'Valor1',
            edad: 42,
            email: 'Valor2',
            // Asigna valores a otros campos según tus necesidades
        });

        // Guarda el documento en la colección
        await nuevoDocumento.save();

        console.log('Documento insertado en la colección "miColeccion"');

        // Cierra la conexión a la base de datos cuando hayas terminado
        mongoose.connection.close();
    })
    .catch((error) => {
        console.error('Error de conexión a MongoDB:', error);
        process.exit(1);
    });
