var restify = require('restify');
var morse = require('morse');

function encode(req, res, next) {
  var answer = {}
  answer.plaintext = req.params.string;
  answer.morsecode = morse.encode(req.params.string);

  res.send(answer);
  next();
}

function decode(req, res, next) {
  var answer = {}
  answer.plaintext = morse.decode(req.params.string);
  answer.morsecode = req.params.string;

  res.send(answer);
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
