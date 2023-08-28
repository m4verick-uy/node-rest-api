import express from 'express';
import bodyParser from 'body-parser';
import { Sequelize } from 'sequelize';
import { databaseConfig, portForHTTP } from '../config.js';
import DbContext from '../DataAccess/DbContext.js';
import PersonRepository from '../DataAccess/PersonRepository.js';
import JobRepository from '../DataAccess/JobRepository.js';


const app = express();
app.use(bodyParser.json());
const sequelize = new Sequelize(databaseConfig);

const dbContext = new DbContext(sequelize);
const personRepo = new PersonRepository(dbContext);
const jobRepo = new JobRepository(dbContext);

sequelize.sync().then(() => {
    console.log('Base de datos sincronizada');
}).catch(error => {
    console.error('Error al sincronizar la base de datos:', error);
});


app.post("/persons", async (req, res) => {
    const { name, age, document, description, rol, jobId } = req.body;
    const newPerson = { name, age, document, description, rol, jobId };

    try {
        await personRepo.addPerson(newPerson);
        res.json(newPerson);
    } catch (error) {
        console.error("Error creating person:", error);
        res.status(500).json({ error: "Error creating person", details: error.message });
    }
});


app.get("/persons", async (req, res) => {
    try {
        const persons = await personRepo.getAllPersons();
        res.json(persons);
    } catch (error) {
        console.error("Error getting persons:", error);
        res.status(500).json({ error: "Error getting persons", details: error.message });
    }
});


app.get("/persons/:document", async (req, res) => {
    try{
        const document = req.params.document;
        const person = await personRepo.getPerson(document);
        res.json(person);
    }catch (error){
        console.error("Error getting person", error);
        res.status(500).json({error: "Error getting person", details: error.message});
    }
});

// Update a person by document
app.put("/persons/:document", async (req, res) => {
    try {
        const document = req.params.document;
        const updatedPerson = req.body; // Assuming the request body contains the updated person data
        const person = await personRepo.updatePerson(document, updatedPerson);
        res.json(person);
    } catch (error) {
        console.error("Error updating person", error);
        res.status(500).json({ error: "Error updating person", details: error.message });
    }
});



// Delete a person by document
app.delete("/persons/:document", (req, res) => {
    // ... (similar to your existing code)
});

app.listen(portForHTTP, () => {
    console.log("Server is running on port", portForHTTP);
});

//-------------------------------JOB CONTROLLER--------------------------------------

app.post("/jobs", async (req, res) => {
    const { title, company, startDate, projects} = req.body;
    const newJob = { title, company, startDate, projects};

    try {
        await jobRepo.addJob(newJob);
        res.json(newJob);
    } catch (error) {
        console.error("Error creating job:", error);
        res.status(500).json({ error: "Error creating job", details: error.message });
    }
});

app.get("/jobs/:id", async (req, res) => {
    try{
        const jobId = req.params.id;
        const job = await jobRepo.findJob(jobId)
        res.json(job);
    }catch (error){
        console.error("Error getting job", error);
        res.status(500).json({error: "Error getting job", details: error.message});
    }
});
