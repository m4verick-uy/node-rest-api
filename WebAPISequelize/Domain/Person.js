// Domain/person.js

class Person {
    constructor(name, age, document, description, rol, jobId) {
        this.name = name;
        this.age = age;
        this.document = document;
        this.description = description;
        this.rol = rol;
        this.jobId = jobId;
    }
}

module.exports = Person;
