var restify = require('restify');
var app = require('./app');

var httpOptions = {
    name: "Morsecode As A Service"
};

var server = restify.createServer(httpOptions);

server.use(restify.queryParser());

server.get('/encode/', app.encode);
server.get('/decode/', app.decode);
server.get('/', app.redirectToDocumentation);

var port = process.env.PORT || 8080;

server.listen(port, function() {
  console.log('%s listening at %s', server.name, server.url);
});
