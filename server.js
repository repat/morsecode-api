var restify = require('restify');
var app = require('./app');

var httpOptions = {
    name: "Morsecode As A Service"
};

var server = restify.createServer(httpOptions);

server.get('/encode/:string', app.encode);
server.get('/decode/:string', app.decode);
server.get('/', app.redirectToDocumentation);

var port = process.env.PORT || 8080;

server.listen(port, function() {
  console.log('%s listening at %s', server.name, server.url);
});
