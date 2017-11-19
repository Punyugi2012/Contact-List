var express = require('express');
var router = express.Router();

var persons = require('../database/persons.js');

router.get('/get-all', (req, res) => {
    res.json(persons);
});

router.get('/get/:firtName/:lastName/:phone', (req, res) => {
    persons.forEach(function (person) {
        if (
            person.firstName === req.params.firstName &&
            person.lastName === req.params.lastName &&
            person.phone === req.params.phone
        ) {
            res.json(persons);
        }
    });
    res.json('not found');
});

router.post('/add-person', (req, res) => {
    if (
        !(req.body.firstName) ||
        !(req.body.lastName) ||
        !(req.body.email) ||
        !(req.body.phone) ||
        !(req.body.notes)
    ) {
        res.status(404);
        res.json('add not success!!');
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
                res.json('was already!!');
            }
        });
        var newPerson = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            phone: req.body.phone,
            notes: req.body.notes
        }
        persons.push(newPerson);
        res.json('add success!!');
    }
});

router.delete('/delete-person/:firstName/:lastName/:phone', (req, res) => {
    persons.forEach(function (person, index) {
        if (
            person.firstName === req.params.firstName &&
            person.lastName === req.params.lastName &&
            person.phone === req.params.phone
        ) {
            console.log(index);
            persons.splice(index, 1);
            res.json('delete success!!');
        }
    });
    res.json('delete not success!!');
});

module.exports = router;