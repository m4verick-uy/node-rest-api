
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


  // Update a person by document
  app.put("/persons/:document", async(req, res) => {
    const document = req.params.document;
    const updatedPerson = req.body;
    const personRepo = new PersonRepository();

    const result = await personRepo.updatePerson(document, updatedPerson);
    if(result) {
      res.json({resultado : 'update exitoso', updatedPerson, document : document}) // Concatena objetos y datos  todo en un JSON
    } else {
      res.status(404).json({ message: "Failed Update" });
    }
  });

  // Delete a person by document
  app.delete("/persons/:document", async(req, res) => {
    const document = req.params.document;
    const personRepo = new PersonRepository();
    const personsDeleted = await personRepo.deletePerson(document);
    if (personsDeleted) {
      res.json({resultado : 'eliminacion exitosa', personsDeleted});
    } else {
      res.status(404).json({ message: "Failed Delete" });
    }
  });

  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log("Server is running on port", PORT);
    
  });