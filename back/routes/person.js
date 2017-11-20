var express = require('express');
var router = express.Router();

var persons = require('../database/persons.js');

router.get('/get-all', (req, res) => {
    res.json(persons);
});


router.get('/get/:firstName/:lastName/:phone', (req, res) => {
    var getPerson = {};
    persons.forEach(function (person) {
        if (
            person.firstName === req.params.firstName &&
            person.lastName === req.params.lastName &&
            person.phone === req.params.phone
        ) {
            getPerson = person;
        }
    });
    res.json(getPerson);
});

router.post('/add-person', (req, res) => {
    var state, duplicate = false;
    if (
        !(req.body.firstName) ||
        !(req.body.lastName) ||
        !(req.body.email) ||
        !(req.body.phone) ||
        !(req.body.notes)
    ) {
        state = 'not success';
    }
    else {
        persons.forEach(function (person) {
            if (
                req.body.firstName === person.firstName &&
                req.body.lastName === person.lastName &&
                req.body.email === person.email &&
                req.body.phone === person.phone &&
                req.body.notes === person.notes
            ) {
                state = 'duplicate';
                duplicate = true;
            }
        });
        if (!duplicate) {
            var newPerson = {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                phone: req.body.phone,
                notes: req.body.notes
            }
            persons.push(newPerson);
            state = 'success';
        }
    }
    res.json(state);
});

router.delete('/delete-person/:firstName/:lastName/:phone', (req, res) => {
    var state = 'not success';
    persons.forEach(function (person, index) {
        if (
            person.firstName === req.params.firstName &&
            person.lastName === req.params.lastName &&
            person.phone === req.params.phone
        ) {
            persons.splice(index, 1);
            state = 'success';
        }
    });
    res.json(state);
});

module.exports = router;