var restify = require('restify');
var morse = require('morse');

const DIT = ".", DAH = "-", WS = " ", API_DOKU = 'https://repat.github.io/morsecode-api/';

function encode(req, res, next) {
  var answer = {}
  answer.plaintext = req.params.string.toUpperCase();
  answer.morsecode = morse.encode(req.params.string);

  res.send(answer);
  next();
}

function decode(req, res, next) {
  var answer = {}
  if (isValidMorseCode(req.params.string)) {
    answer.plaintext = morse.decode(req.params.string);
  }
  else {
    answer.plaintext = ""
  }
  answer.morsecode = req.params.string;

  res.send(answer);
  next();
}

function redirectToDocumentation(req,res,next) {
  res.send(302, null, {
    Location: API_DOKU
  });
  next();
}

function countOccurrences(string,character) {
	return (string.split(character).length - 1)
}

function isValidMorseCode(string) {
  if ((string.indexOf(DIT) >= 0 || string.indexOf(DAH) >= 0 || string.indexOf(WS) >= 0)
     && countOccurrences(string,DIT)
        + countOccurrences(string,DAH)
        + countOccurrences(string,WS) == string.length) {
    return true;
  }
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
