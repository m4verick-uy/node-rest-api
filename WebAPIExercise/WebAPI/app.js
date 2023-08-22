
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
  try{
      personRepo.createPerson(newPerson);
      res.json(newPerson);
  } catch(error){
      console.error("Error en la Insercion:", error);
      res.status(500).json({ error: "Error en la Insercion" });
  }
});

// Get all persons
app.get("/persons", async (req, res) => {
  const personRepo = new PersonRepository();
  try{
      let allPersons = await personRepo.getAllPersons();
      console.log('aca esta todas las personas', allPersons);
      res.json(allPersons);
  } catch(error){
    console.error("Error en la obtencion:", error);
    res.status(500).json({ error: "Error en la obtencion"});
  }
  
});

// Get a specific person by document
app.get("/persons/:document", async (req, res) => {
  const document = req.params.document;
  const personRepo = new PersonRepository();
  try {
    const person = await personRepo.getPersonByDocument(document);
    console.log('aca esta la persona buscada', person);
    if (person) {
      res.json(person);
    } else {
      res.status(404).json({ message: "Person not found" });
    }
  } catch (error) {
    console.error("Error en la obtencion:", error);
    res.status(500).json({ error: "Error en la obtencion" });
  }
});


// Update a person by document
app.put("/persons/:document", async (req, res) => {
  const document = req.params.document;
  const updatedPerson = req.body;
  const personRepo = new PersonRepository();

  try {
    const result = await personRepo.updatePerson(document, updatedPerson);
    if (result) {
      res.json({ resultado: 'update exitoso', updatedPerson, document: document });
    } else {
      res.status(404).json({ message: "Failed Update" });
    }
  } catch (error) {
    console.error("Error en la actualización:", error);
    res.status(500).json({ error: "Error en la actualización" });
  }
});

// Delete a person by document
app.delete("/persons/:document", async (req, res) => {
  const document = req.params.document;
  const personRepo = new PersonRepository();
  try {
    const personsDeleted = await personRepo.deletePerson(document);
    if (personsDeleted) {
      res.json({ resultado: 'eliminacion exitosa', personsDeleted });
    } else {
      res.status(404).json({ message: "Failed Delete" });
    }
  } catch (error) {
    console.error("Error en la eliminacion:", error);
    res.status(500).json({ error: "Error en la eliminacion" })
  }

});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server is running on port", PORT);

});