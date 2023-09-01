const mongoose = require('mongoose');

const personSchema = new mongoose.Schema({
    name: String,
    age: Number,
    document: { type: String, unique: true },
    description: String,
    rol: String
});

module.exports = mongoose.model('Person', personSchema);
