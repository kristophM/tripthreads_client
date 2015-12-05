var express = require('express');

var port = process.env.PORT || 8282;
var runFolder = "/";

var app = express();

// Static file path.
app.use(express.static(__dirname + runFolder));

var permitStaticNavigation = function(request, response){
    response.sendFile(__dirname + request.url);
};

app.get('/bower_components/**/*.js', permitStaticNavigation);
app.get('/bower_components/**/*.css', permitStaticNavigation);

var permitBuiltNavigation = function(request, response){
    response.sendFile(__dirname + runFolder + request.url);
};

app.get('/styles/**/*.css', permitBuiltNavigation);
app.get('/scripts/**/*.js', permitBuiltNavigation);
app.get('/templates/**/*.html', permitBuiltNavigation);
app.get('/langauges/**/*.json', permitBuiltNavigation);
app.get('/images/**/*.png', permitBuiltNavigation);

app.get('*', function(request, response){
    response.sendFile(__dirname + runFolder + '/index.html');
});

app.listen(port);
console.log('server started on port ' + port);
