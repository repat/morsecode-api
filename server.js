var restify = require('restify');
var morse = require('morse');

function encode(req, res, next) {
  var array = {}
  array.plaintext = req.params.string;
  array.morsecode = morse.encode(req.params.string);

  res.send(array);
  next();
}

function decode(req, res, next) {
  var array = {}
  array.plaintext = morse.decode(req.params.string);
  array.morsecode = req.params.string;

  res.send(array);
  next();
}

function redirectToDocumentation(req,res,next) {
  res.send(302, null, {
    Location: 'https://repat.github.io/morsecode-api/'
  });
  next();
}

var httpOptions = {
    name: "Morsecode As A Service"
};

var server = restify.createServer(httpOptions);

server.get('/encode/:string', encode);
server.get('/decode/:string', decode);
server.get('/',redirectToDocumentation);

var port = process.env.PORT || 8080;

server.listen(port, function() {
  console.log('%s listening at %s', server.name, server.url);
});
