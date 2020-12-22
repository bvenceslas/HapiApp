const mongoose = require('mongoose');

const PersonSchema = mongoose.Schema({
    firstname: String,
    lastname:String,
    phone:String
});

const Person = mongoose.model('persons', PersonSchema);

module.exports = Person;