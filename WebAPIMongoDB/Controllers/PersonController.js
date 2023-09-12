const express = require('express');
const router = express.Router();
const PersonRepository = require('../DataAccess/PersonRepository');

router.post('/persons', async (req, res) => {
    try {
        const { name, age, document, description, rol } = req.body;
        const personData = { name, age, document, description, rol };
        const newPerson = await PersonRepository.createPerson(personData);
        res.status(201).json(newPerson);
    } catch (error) {
        console.error('Error al crear la persona:', error);
        res.status(500).json({ message: 'Error al crear la persona' });
    }
});

// Implementa otras rutas CRUD según tus necesidades

module.exports = router;
