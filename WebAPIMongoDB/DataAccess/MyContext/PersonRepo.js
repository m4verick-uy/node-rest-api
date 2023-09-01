const Person = require('../../Domain/Person'); // Importa el modelo Person que estás utilizando
const db = require('../MyContext/DbContext'); // Reemplaza con la ruta correcta a tu archivo db.js

class PersonRepository {
    async addPerson(person) {
        try {
            await db.once('open', async () => {
                const newPerson = new Person(person);
                await newPerson.save();
                console.log("Person added:", newPerson);
            });
        } catch (error) {
            console.error("Error adding person:", error);
            throw error;
        }
    }

    async getAllPersons() {
        try {
            const persons = await Person.find();
            return persons;
        } catch (error) {
            console.error("Error getting persons:", error);
            throw error;
        }
    }

    // ... otros métodos de repositorio ...
}

module.exports = new PersonRepository();
