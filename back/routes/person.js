var express = require('express');
var router = express.Router();

var persons = require('../database/persons.js');

router.get('/get-all', (req, res) => {
    var personsNotNull = [];
    persons.forEach();
});
router.get('/get/:id', (req, res) => {
    persons.forEach(function(person) {
        if(person.id === req.params.id) {
            res.send(persons);
        }
    });
    res.json({});
});
function getMaxId() {
    var max = 0;
    persons.forEach(function(person) {
        max = Math.max(max, parseInt(person.id));
    });
    return max;
}
router.post('/add-person', (req, res) => {
    var newId = getMaxId() + 1;
    var newPerson = {
        id: newId,
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        notes: req.body.notes
    }
    persons[newId] = newPerson;
    res.send('add success');
});
router.delete('/delete-person/:id', (req, res) => {
    persons.splice(req.params.id, 1);
    res.send('delete success');
});

module.exports = router;