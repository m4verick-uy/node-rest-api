class PersonRepository {
    constructor(dbContext) {
        this.Persons = dbContext.Persons;
    }

    async getAllPersons() {
        return await this.Persons.findAll();
    }

    async addPerson(person) {
        return await this.Persons.create({
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
