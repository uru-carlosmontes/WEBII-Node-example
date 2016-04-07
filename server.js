/**
 * Created by Carlos on 18-03-2015.
 */
// These are the libs
//var http = require('http'); //http is like the HttpServlet class that use Java
var express = require('express'); //Express is the Framework remember to use npm install
var path = require("path"); // path is a lib that nodejs have, this lib manipulates the path of the system
var bodyParser = require('body-parser'); //Parse the request data to JSON

//look this carefully the user var is an instance of a class created in the
//folder "routes", this is like the servlet, check the user file
var user = require('./routes/user');

//here we start to use the express framework
var app = express();

//with the express we can tell to server what port we gonna use.
app.set("port", 10000);

//DON'T SCARE!!, this is just to tell express where are the clients-files (HTMLs, CSS, Javascript)
//look at the public folder
app.use(express.static(__dirname + '/public'));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json());

//this is important, remember the user file?, here we are implement it
//the "app" parameter is passed because, app manage the GET, POST, PUT, DELETE methods
//and the others HTTP methods we know, if you saw the user file, we use app for that
user(app);

//And then, we finish of create the server
app.listen(app.get('port'), function(){
    console.log('Express server listening on port ' + app.get('port'));
});