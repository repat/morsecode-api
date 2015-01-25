module.exports = {
  encode : encode,
  decode : decode,
  redirectToDocumentation : redirectToDocumentation
}

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

function isValidMorseCode(string) {
  return ((string.indexOf(DIT) >= 0 || string.indexOf(DAH) >= 0 || string.indexOf(WS) >= 0)
     && isValidLength(string))
}

function isValidLength(string) {
  return (((string.split(DIT).length - 1)
         + (string.split(DAH).length - 1)
         + (string.split(WS).length - 1)) == string.length);
}
