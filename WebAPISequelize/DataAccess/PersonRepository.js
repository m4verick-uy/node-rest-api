class PersonRepository {
    constructor(dbContext) {
        this.Person = dbContext.Person;
    }

    async getAllPersons() {
        return await this.Person.findAll();
    }

    async addPerson(person) {
        return await this.Person.create({
            name: person.name,
            age: person.age,
            document: person.document,
            description: person.description,
            rol: person.rol,
            jobId: person.jobId,
        });
    }

    async getPerson(document) {
        return await this.Person.findOne({
            where: {
                document: document
            }
        });
    }

    async updatePerson(document, updatedPerson) {
        const person = await this.getPerson(document);
        if (person) {
            await person.update(updatedPerson);
            return person;
        } else {
            throw new Error(`Person with document ${document} not found`);
        }
    }
}

export default PersonRepository;
