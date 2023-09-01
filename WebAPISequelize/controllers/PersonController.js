import { Sequelize } from "sequelize"
import DbContext from '../DataAccess/DbContext.js';
import { databaseConfig, portForHTTP } from '../config.js';
import PersonRepository from "../DataAccess/PersonRepository.js";

const sequelize = new Sequelize(databaseConfig)
const dbContext = new DbContext(sequelize);
const personRepo = new PersonRepository(dbContext);

const PersonController = {

    addPerson: async (req,res) => {
        const { name, age, document, description, rol, jobId } = req.body;
        const newPerson = { name, age, document, description, rol, jobId };

        try {
            await personRepo.addPerson(newPerson);
            res.json(newPerson);
        } catch (error) {
            console.error("Error creating person:", error);
            res.status(500).json({ error: "Error creating person", details: error.message });
        }
    },

    getAllPerson: async(req, res) => {
        try {
            const persons = await personRepo.getAllPersons();
            res.json(persons);
        } catch (error) {
            console.error("Error getting persons:", error);
            res.status(500).json({ error: "Error getting persons", details: error.message });
        }
    },

    getPerson: async(req,res) => {
        try{
            const document = req.params.document;
            const person = await personRepo.getPerson(document);
            res.json(person);
        }catch (error){
            console.error("Error getting person", error);
            res.status(500).json({error: "Error getting person", details: error.message});
        }
    },

    updatePerson: async(req,res) => {
        try {
            const document = req.params.document;
            const updatedPerson = req.body; // Assuming the request body contains the updated person data
            const person = await personRepo.updatePerson(document, updatedPerson);
            res.json(person);
        } catch (error) {
            console.error("Error updating person", error);
            res.status(500).json({ error: "Error updating person", details: error.message });
        }
    },

    deletePerson: async(req,res) => {
        console.log("entre al delete controller")
        try{
            const document = req.params.document;
            const retorno = await personRepo.deletePerson(document);
            console.log(document)
            res.json(retorno);
        } catch(error){
            console.error("Error deleting person", error);
            res.status(500).json({ error: "Error deleting person", details: error.message });
        }
    }
};

export default PersonController;