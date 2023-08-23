import {DataTypes, Sequelize} from 'sequelize';
import {databaseConfig} from '../config.js';


const sequelize = new Sequelize(databaseConfig);

class PersonRepository {
    constructor() {
        // Define the Person model
        this.Person = sequelize.define('Person', {
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            age: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            document: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
            },
            description: {
                type: DataTypes.STRING,
            },
            rol: {
                type: DataTypes.STRING,
            },
        });

        // Create tables if they don't exist
        sequelize.sync();
    }

    async getAllPersons() {
        return this.Person.findAll();
    }

    async createPerson(person) {
        return this.Person.create({
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
