
import express from 'express';
import bodyParser from 'body-parser';
import PersonRepository from '../DataAccess/PersonRepository.js';


  const app = express();
  app.use(bodyParser.json());

  const persons = [];

  // Create a new person
  app.post("/persons", (req, res) => {
    const { name, age, document, description, rol } = req.body;
    const newPerson = { name, age, document, description, rol };
    const personRepo = new PersonRepository();
    personRepo.createPerson(newPerson);
    
    res.json(newPerson);
  });

  // Get all persons
  app.get("/persons", async(req, res) => {
    const personRepo = new PersonRepository();
    let allPersons = await personRepo.getAllPersons();
    console.log('aca esta todas las personas', allPersons);
    res.json(allPersons);
  });

  // Get a specific person by document
  app.get("/persons/:document", async(req, res) => {
    const document = req.params.document;
    const personRepo = new PersonRepository();
    const person = await personRepo.getPersonByDocument(document);
    console.log('aca esta la persona buscada', person);
    if (person) {
      res.json(person);
    } else {
      res.status(404).json({ message: "Person not found" });
    }
  });

  // Get a specific peron by document with SQL request



  // Update a person by document
  app.put("/persons/:document", (req, res) => {
    const document = req.params.document;
    const updatedPerson = req.body;
    const personIndex = persons.findIndex(person => person.document === document);
    if (personIndex !== -1) {
      persons[personIndex] = { ...persons[personIndex], ...updatedPerson };
      res.json(persons[personIndex]);
    } else {
      res.status(404).json({ message: "Person not found" });
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
      res.status(404).json({ message: "Person not found" });
    }
  });

  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log("Server is running on port", PORT);
    
  });