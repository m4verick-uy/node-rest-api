class PersonRepository {
    constructor(dbContext) {
        this.Persons = dbContext.Persons;
    }

    async getAllPersons() {
        return this.Persons.findAll();
    }

    async addPerson(person) {
        return this.Persons.create({
            name: person.name,
            age: person.age,
            document: person.document,
            description: person.description,
            rol: person.rol,
        });
    }

    // Implement other CRUD methods here...
}

export default PersonRepository;
