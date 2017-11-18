var express = require('express');
var bodyParser = require('body-parser');
var personRouter = require('./routes/person.js');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use('/person', personRouter);

module.exports = app;