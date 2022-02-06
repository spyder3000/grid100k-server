const express = require('express'); 
const Person = require('../models/person')
const router = new express.Router();   /* create a Router */
const validator = require('validator'); 
const misc = require('./misc'); 

/*  Async -- Send GET data via HTTP request to get all persons  (e.g. from Postman)  */
// e.g. localhost:3001/api/personsAll?sort=scoredesc ;  
router.get('/personsAll', async (req, res) => {
    console.log('routers\person.js -- personsAll'); 
    const opts = {};    // e.g. gender, state, age, score, & Search Name
    const other = {};       // e.g. Sort options, Page Options

    other.sort = { id: 1};   // default;  
    if (req.query.sort)  {
        if (req.query.sort == 'nameasc') other.sort = { last_name: 1, first_name: 1}; 
        else if (req.query.sort == 'namedesc') other.sort = { last_name: -1, first_name: -1}; 
        else if (req.query.sort == 'scoreasc') other.sort = { score: 1, id: 1}; 
        else if (req.query.sort == 'scoredesc') other.sort = { score: -1, id: 1}; 
        else if (req.query.sort == 'idasc') other.sort = { id: 1}; 
        else if (req.query.sort == 'iddesc') other.sort = { id: -1}; 
        else if (req.query.sort == 'ageasc') other.sort = { age: 1, score: -1, last_name: 1}; 
        else if (req.query.sort == 'agedesc') other.sort = { age: -1, score: -1, last_name: 1}; 
    }

    try {
        const persons = await Person.find(
            opts, null, other  
        ).select(    // Person.find() returns promise;  "_id": 0 to exclude _id;  otherwise '1' means to include 
        {"first_name": 1, "last_name": 1, "state": 1, "id": 1, "age": 1, "gender": 1, "score": 1, "professional": 1, "_id": 1});    

        // console.log('persons.length = ' + persons.length)
        const dat = { persons }; 
        dat.tot = await Person.find(opts).countDocuments(); 

        res.status(201).send(dat); 
    } catch (e) {
        res.status(400).send();  
    }
})

/*  Async -- Send GET data via HTTP request to get all persons based on params (e.g. from Postman)  */
// e.g. localhost:3001/api/personsFilter?state=FL;  
// e.g. localhost:3001/api/personsFilter?limit=50&skip=2    // e.g. skip is # of pages to skip 
// e.g. localhost:3001/api/personsFilter?sort=scoredesc  
router.get('/personsFilter', async (req, res) => {
    console.log('routers\person.js'); 
    const opts = {};    // e.g. gender, state, age, score, & Search Name
    const other = {};       // e.g. Sort options, Page Options

    other.sort = { id: 1};   // default;  
    if (req.query.sort)  {
        if (req.query.sort == 'nameasc') other.sort = { last_name: 1, first_name: 1}; 
        else if (req.query.sort == 'namedesc') other.sort = { last_name: -1, first_name: -1}; 
        else if (req.query.sort == 'scoreasc') other.sort = { score: 1, id: 1}; 
        else if (req.query.sort == 'scoredesc') other.sort = { score: -1, id: 1}; 
        else if (req.query.sort == 'idasc') other.sort = { id: 1}; 
        else if (req.query.sort == 'iddesc') other.sort = { id: -1}; 
        else if (req.query.sort == 'ageasc') other.sort = { age: 1, score: -1, last_name: 1}; 
        else if (req.query.sort == 'agedesc') other.sort = { age: -1, score: -1, last_name: 1}; 
    }

    other.limit = 20;   // default
    other.skip = 0;     // default
    if (req.query.limit && validator.isInt(req.query.limit, {min: 0, max: 500 }) )  other.limit = parseInt(req.query.limit);  
    if (req.query.skip && validator.isInt(req.query.skip, { min: 0, max: 5000})) other.skip = parseInt(req.query.skip) * other.limit; 

    // SEARCH query -- will search First & Last Name;  Will ignore any other filters;  ignore search < 3 chars
    if (req.query.str && validator.isAlpha(req.query.str) && validator.isLength(req.query.str, {min: 3})) {
        let regex = new RegExp(req.query.str,"i"); 
        opts.findName = { $or: [{first_name: regex}, {last_name: regex}]}; 
        const persons = await Person.find(
            opts.findName, null, other  
        ).select(    // Person.find() returns promise;  "_id": 0 to exclude _id;  otherwise '1' means to include 
        {"first_name": 1, "last_name": 1, "state": 1, "id": 1, "age": 1, "gender": 1, "score": 1, "professional": 1, "_id": 1});  

        const dat = { persons }; 
        dat.tot = await Person.find(opts.findName).countDocuments(); 

        res.status(201).send(dat); 

        return; 
    }

    // ALL OTHER queries (not Search) -- will return data based on Filters & Sort By criteria 
    if (req.query.stateXX) opts.state = req.query.stateXX.toUpperCase();   
    if (req.query.gender) opts.gender = req.query.gender.toUpperCase();   
    if (req.query.score) opts.score = misc.getRangeScore(req.query.score);  
    if (req.query.age) opts.age = misc.getRangeAge(req.query.age);

    try {
        const persons = await Person.find(
            opts, null, other  
        ).select(    // Person.find() returns promise;  "_id": 0 to exclude _id;  otherwise '1' means to include 
        {"first_name": 1, "last_name": 1, "state": 1, "id": 1, "age": 1, "gender": 1, "score": 1, "professional": 1, "_id": 1});    

        // console.log('persons.length = ' + persons.length)
        const dat = { persons }; 
        dat.tot = await Person.find(opts).countDocuments(); 

        res.status(201).send(dat); 
    } catch (e) {
        res.status(400).send();  
    }
})

/*  Async -- GET data via HTTP request to get Person based on id  (e.g. from Postman) -- e.g. localhost:3000/persons/8675  */
router.get('/persons/:id', async (req, res) => {
    const person = await Person.find({ id: req.params.id}); 
    if (!person) {
        throw new Error()   // will immediately jump to catch (no person)
    }
    res.send(person[0]);      
}); 

module.exports = router;  