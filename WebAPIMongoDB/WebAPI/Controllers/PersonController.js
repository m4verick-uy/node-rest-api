
const express = require('express');
const personRepo = require('../../DataAccess/PersonRepository');

const router = express.Router();

router.post('/persons', async (req, res) => {
    try {
        const newPerson = req.body;
        await personRepo.addPerson(newPerson);
        res.json(newPerson);
    } catch (error) {
        console.error("Error creating person:", error);
        res.status(500).json({ error: "Error creating person", details: error.message });
    }
});


module.exports = router;
