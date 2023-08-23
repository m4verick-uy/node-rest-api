import express from 'express';
import bodyParser from 'body-parser';
import { Sequelize } from 'sequelize';
import { databaseConfig, portForHTTP } from '../config.js';
import DbContext from '../DataAccess/DbContext.js';
import PersonRepository from '../DataAccess/PersonRepository.js';

const app = express();
app.use(bodyParser.json());
const sequelize = new Sequelize(databaseConfig);

const dbContext = new DbContext(sequelize);
const personRepo = new PersonRepository(dbContext);

// Create a new person
app.post("/persons", async (req, res) => {
    const { name, age, document, description, rol } = req.body;
    const newPerson = { name, age, document, description, rol };

    try {
        await personRepo.addPerson(newPerson);
        res.json(newPerson);
    } catch (error) {
        console.error("Error creating person:", error);
        res.status(500).json({ error: "Error creating person", details: error.message });
    }
});

// Get all persons
app.get("/persons", async (req, res) => {
    try {
        const persons = await personRepo.getAllPersons();
        res.json(persons);
    } catch (error) {
        console.error("Error getting persons:", error);
        res.status(500).json({ error: "Error getting persons", details: error.message });
    }
});

// Get a specific person by document
app.get("/persons/:document", (req, res) => {
    // ... (similar to your existing code)
});

// Update a person by document
app.put("/persons/:document", (req, res) => {
    // ... (similar to your existing code)
});

// Delete a person by document
app.delete("/persons/:document", (req, res) => {
    // ... (similar to your existing code)
});

app.listen(portForHTTP, () => {
    console.log("Server is running on port", portForHTTP);
});
