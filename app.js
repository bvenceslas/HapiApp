const Hapi = require('hapi');

// initialise server
const server = new Hapi.Server({
    port: 8000,
    host: 'localhost'
});

server.start()
    .then(console.log(`Hapi Server running at ${server.info.uri} ...`))
    .catch(err => console.log({msg: err}));