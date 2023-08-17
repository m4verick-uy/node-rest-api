
  const express = require("express");
  const bodyParser = require("body-parser");
  const config = require('../config');
  const Person = require('../Domain/person');


  const app = express();
  app.use(bodyParser.json());

  const persons = [];

  // Create a new person
  app.post("/persons", (req, res) => {
    const { name, age, document, description, rol } = req.body;
    const newPerson = { name, age, document, description, rol };
    persons.push(newPerson);
    res.json(newPerson);
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
      res.status(404).json({ message: "Person not found" });
    }
  });

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