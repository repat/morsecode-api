var restify = require('restify');
var morse = require('morse');

function encode(req, res, next) {
  var array = {}
  array.plaintext = req.params.string;
  array.morsecode = morse.encode(req.params.string);
  console.log(array.morsecode);

  res.send(array);
  next();
}

function decode(req, res, next) {
  var array = {}
  array.morsecode = req.params.string;
  array.plaintext = morse.decode(req.params.string);

  res.send(array);
  next();
}

var httpOptions = {
    name: "Morsecode As A Service"
};

var server = restify.createServer(httpOptions);

server.get('/encode/:string', encode);
server.get('/decode/:string', decode);


var port = process.env.PORT || 8080;

server.listen(port, function() {
  console.log('%s listening at %s', server.name, server.url);
});
