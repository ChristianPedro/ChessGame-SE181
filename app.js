var express = require('express');
var path = require('path');

//init express
var app = express();


//Variables 
var PORT = process.env.PORT || 5000;

//Create endpoint handlers
app.use(express.static(path.join(__dirname, 'public')));

//listen on port
app.listen(PORT, function() {console.log('server started on ${PORT}');}
);