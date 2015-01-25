var frisby = require('frisby');
// this still gives 500 internal server error
// see https://github.com/vlucas/frisby/issues/133
// const ENDPOINT = 'localhost:8080/';
const ENDPOINT = 'http://www.morsecode-api.de/';

console.log("Testing with " + ENDPOINT);

frisby.create('Morsecode As A Service Encode One Letter')
  .get(ENDPOINT + 'encode/A')
  .expectStatus(200)
  .expectHeaderContains('content-type', 'application/json')
  .expectJSON({
    plaintext: "A",
    morsecode: ".-"
  })
.expectJSONTypes({
    plaintext: String,
    morsecode: String
  })
.toss();
frisby.create('Morsecode As A Service Decode One Letter')
  .get(ENDPOINT + 'decode/.-')
  .expectStatus(200)
  .expectHeaderContains('content-type', 'application/json')
  .expectJSON({
    plaintext: "A",
    morsecode: ".-"
  })
.expectJSONTypes({
    plaintext: String,
    morsecode: String
  })
.toss();
frisby.create('Morsecode As A Service Encode Word')
  .get(ENDPOINT + 'encode/Foo')
  .expectStatus(200)
  .expectHeaderContains('content-type', 'application/json')
  .expectJSON({
  "plaintext": "FOO",
  "morsecode": "..-. --- ---"
})
.expectJSONTypes({
    plaintext: String,
    morsecode: String
  })
.toss();
frisby.create('Morsecode As A Service Decode Word')
  .get(ENDPOINT + 'decode/-...%20.-%20.-.')
  .expectStatus(200)
  .expectHeaderContains('content-type', 'application/json')
  .expectJSON({
  "plaintext": "BAR",
  "morsecode": "-... .- .-."
})
.expectJSONTypes({
    plaintext: String,
    morsecode: String
  })
.toss();
frisby.create('Morsecode As A Service Encode Empty String')
  .get(ENDPOINT + 'encode/')
  .expectStatus(200)
  .expectHeaderContains('content-type', 'application/json')
  .expectJSON({
  "plaintext": "",
  "morsecode": ""
})
.expectJSONTypes({
    plaintext: String,
    morsecode: String
  })
.toss();
frisby.create('Morsecode As A Service Decode Empty String')
  .get(ENDPOINT + 'decode/')
  .expectStatus(200)
  .expectHeaderContains('content-type', 'application/json')
  .expectJSON({
  "plaintext": "",
  "morsecode": ""
})
.expectJSONTypes({
    plaintext: String,
    morsecode: String
  })
.toss();
frisby.create('Morsecode As A Service Encode Unknown Character')
  .get(ENDPOINT + 'encode/$')
  .expectStatus(200)
  .expectHeaderContains('content-type', 'application/json')
  .expectJSON({
  "plaintext": "$",
  "morsecode": "?"
})
.expectJSONTypes({
    plaintext: String,
    morsecode: String
  })
.toss();
frisby.create('Morsecode As A Service Decode Only Plaintext')
  .get(ENDPOINT + 'decode/onlyplaintext')
  .expectStatus(200)
  .expectHeaderContains('content-type', 'application/json')
  .expectJSON({
  "plaintext": "",
  "morsecode": "onlyplaintext"
})
.expectJSONTypes({
    plaintext: String,
    morsecode: String
  })
.toss();
frisby.create('Morsecode As A Service Decode Mixed Plaintext')
  .get(ENDPOINT + 'decode/mixed.-plaintext')
  .expectStatus(200)
  .expectHeaderContains('content-type', 'application/json')
  .expectJSON({
  "plaintext": "",
  "morsecode": "mixed.-plaintext"
})
.expectJSONTypes({
    plaintext: String,
    morsecode: String
  })
.toss();
frisby.create('Morsecode As A Service Root')
  .get(ENDPOINT)
  .expectStatus(200)
.toss();
frisby.create('Morsecode As A Service encode without slash')
  .get(ENDPOINT + 'encode')
  .expectStatus(404)
  .expectHeaderContains('content-type', 'application/json')
  .expectJSON({
  "code": "ResourceNotFound",
  "message": "/encode does not exist"
})
.expectJSONTypes({
    code: String,
    message: String
  })
.toss();
frisby.create('Morsecode As A Service Decode without slash')
  .get(ENDPOINT + 'decode')
  .expectStatus(404)
  .expectHeaderContains('content-type', 'application/json')
  .expectJSON({
  "code": "ResourceNotFound",
  "message": "/decode does not exist"
})
.expectJSONTypes({
    code: String,
    message: String
  })
.toss();



