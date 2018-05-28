const http = require('http');
const app = require('./app');
const port = process.env.PORT || 8080;
const server = http.createServer(app); //Don't need to create server when app is the express server

server.listen(port, () => console.log(`Listening on port ${port}`));



//app.listen(8080, () => console.log(`Listening on port ${port} ..`));  //Bring up express listener for req, and add function that says something what its doing
                                                    // replace 8080 with a dynamic value obtained from 'port', replace ' ' with ``