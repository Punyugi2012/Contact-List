var express = require('express');
var bodyParser = require('body-parser');
var personRouter = require('./routes/person.js');
var cors = require('cors');

var app = express();

app.use(cors());
app.use(function (req, res, next) {
    console.log(`Request: ${req.url} ${new Date()}`);
    next();
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/person', personRouter);
app.use('*', function (req, res) {
    res.status(404);
    res.json({});
});
module.exports = app;