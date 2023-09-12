const Person = require('../Domain/Person');

// ...

// Función asincrónica para realizar la verificación y creación de la colección
async function checkAndCreateCollection() {
    // Asegúrate de que la colección "persons" exista (esto no es necesario, pero es una precaución)
    const collectionExists = await Person.exists();
    if (!collectionExists) {
        await Person.createCollection();
    }

    // Continúa con la inserción de datos en la colección "persons"
    const nuevoDocumento = new Person({
        nombre: 'Valor1',
        edad: 42,
        document: '34334222',
        description: "la primera persona en mongoDB",
        rol: "public"
        // Asigna valores a otros campos según tus necesidades
    });
    await nuevoDocumento.save();
}

// Llama a la función asincrónica
checkAndCreateCollection()
    .then(() => {
        console.log('Colección verificada');
    })
    .catch((error) => {
        console.error('Error al verificar y crear la colección:', error);
    });

module.exports = new PersonRepository();
