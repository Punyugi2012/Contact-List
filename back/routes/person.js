var express = require('express');
var router = express.Router();

var persons = require('../database/persons.js');

router.get('/get-all', (req, res) => {
    res.json(persons);
});

router.get('/get/:firstName/:lastName/:phone', (req, res) => {
    var found = false;
    persons.forEach(function (person) {
        if (
            person.firstName === req.params.firstName &&
            person.lastName === req.params.lastName &&
            person.phone === req.params.phone
        ) {
            res.json(person);
            found = true;
        }
    });
    if(!found) {
        res.json('not found');
    }
});

router.post('/add-person', (req, res) => {
    if (
        !(req.body.firstName) ||
        !(req.body.lastName) ||
        !(req.body.email) ||
        !(req.body.phone) ||
        !(req.body.notes)
    ) {
        res.json('not success');
    }
    else {
        var duplicate = false;
        persons.forEach(function (person) {
            if (
                req.body.firstName === person.firstName &&
                req.body.lastName === person.lastName &&
                req.body.email === person.email &&
                req.body.phone === person.phone &&
                req.body.notes === person.notes
            ) {
                res.json('duplicate');
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
            res.json('success');
        }
    }
});

router.delete('/delete-person/:firstName/:lastName/:phone', (req, res) => {
    var found = false;
    persons.forEach(function (person, index) {
        if (
            person.firstName === req.params.firstName &&
            person.lastName === req.params.lastName &&
            person.phone === req.params.phone
        ) {
            persons.splice(index, 1);
            res.json('success');
            found = true;
        }
    });
    if (!found) {
        res.json('not success');
    }
});

module.exports = router;