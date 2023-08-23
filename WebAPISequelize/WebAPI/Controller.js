import express          from 'express';
import bodyParser       from 'body-parser';
import {Sequelize}      from 'sequelize';
import {databaseConfig, portForHTTP } from '../config.js';
import PersonRepository from '../DataAccess/PersonRepository.js';


const app = express();
app.use(bodyParser.json());
const sequelize = new Sequelize(databaseConfig);


// Create a new person
app.post("/persons", async (req, res) => {
    const {name, age, document, description, rol} = req.body;
    const newPerson = {name, age, document, description, rol};

    const personRepo = new PersonRepository(sequelize); // Pasar sequelize como argumento
    try {
        await personRepo.createPerson(newPerson);
        res.json(newPerson);
    } catch (error) {
        console.error("Error creating person:", error);
        res.status(500).json({error: "Error creating person", details: error.message});
    }
});

// Get all persons
app.get("/persons", (req, res) => {
    res.json(persons);
});

// Get a specific person by document
app.get("/persons/:document", (req, res) => {
    const document = req.params.document;
    const person = persons.find(person => person.document === document);
    if (person) {
        res.json(person);
    } else {
        res.status(404).json({message: "Person not found"});
    }
});

// Update a person by document
app.put("/persons/:document", (req, res) => {
    const document = req.params.document;
    const updatedPerson = req.body;
    const personIndex = persons.findIndex(person => person.document === document);
    if (personIndex !== -1) {
        persons[personIndex] = {...persons[personIndex], ...updatedPerson};
        res.json(persons[personIndex]);
    } else {
        res.status(404).json({message: "Person not found"});
    }
});

// Delete a person by document
app.delete("/persons/:document", (req, res) => {
    const document = req.params.document;
    const personIndex = persons.findIndex(person => person.document === document);
    if (personIndex !== -1) {
        const deletedPerson = persons.splice(personIndex, 1)[0];
        res.json(deletedPerson);
    } else {
        res.status(404).json({message: "Person not found"});
    }
});

app.listen(portForHTTP, () => {
    console.log("Server is running on port", portForHTTP);
});