var express = require('express');
var router = express.Router();

var persons = require('../database/persons.js');

router.get('/', (req, res) => {
    if(req.query.firstName) {
        var personBuffer = [];
        persons.forEach(function(person) {
            if(person.firstName === req.query.firstName) {
                personBuffer.push(person);
            }
        });
        res.json(personBuffer);
    }
    else {
        res.json(persons);
    }
});

router.get('/:id', (req, res) => {
    var getPerson = 'not success';
    for (var i = 0; i < persons.length; i++) {
        if (
            persons[i].id === req.params.id
        ) {
            getPerson = persons[i];
            break;
        }
    }
    res.json(getPerson);
});

router.post('/', (req, res) => {
    var state;
    if (
        !(req.body.firstName) ||
        !(req.body.lastName) ||
        !(req.body.email) ||
        !(req.body.phone)
    ) {
        state = 'not success';
    }
    else {
        var newId = 0;
        if (persons.length) {
            newId = parseInt(persons[persons.length - 1].id) + 1;
        }
        var newPerson = {
            id: newId.toString(),
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            phone: req.body.phone,
            notes: req.body.notes
        }
        persons.push(newPerson);
        state = 'success';
    }
    res.json(state);
});

router.put('/:id', (req, res) => {
    var state;
    if (
        !(req.body.firstName) ||
        !(req.body.lastName) ||
        !(req.body.email) ||
        !(req.body.phone)
    ) {
        state = 'not success';
    }
    else {
        var i = 0;
        for (i = 0; i < persons.length; i++) {
            if (persons[i].id === req.params.id) {
                persons[i].firstName = req.body.firstName;
                persons[i].lastName = req.body.lastName;
                persons[i].email = req.body.email;
                persons[i].phone = req.body.phone;
                persons[i].notes = req.body.notes;
                state = 'success';
                break;
            }
        }
    }
    res.json(state);
});

router.delete('/:id', (req, res) => {
    var state = 'not success';
    for (var i = 0; i < persons.length; i++) {
        if (
            persons[i].id === req.params.id
        ) {
            persons.splice(i, 1);
            state = 'success';
            break;
        }
    }
    res.json(state);
});

module.exports = router;