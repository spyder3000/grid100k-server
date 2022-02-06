const mongoose = require('mongoose'); 

const personSchema = new mongoose.Schema({
    id: { type: Number }, 
    age: { type: Number }, 
    first_name: { type: String, trim: true}, 
    last_name: { type: String, trim: true},
    state: { type: String},
    gender: { type: String},
    score: { type: Number},
    professional: { type: String},
    image: { type: String},
    catchphrase: { type: String},
    favorite_movie: { type: String},
    job: { type: String}
}, {
    timestamps: true
})

const Person = mongoose.model('Persons', personSchema) 

module.exports = Person; 