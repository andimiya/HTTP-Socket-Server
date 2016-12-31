const net = require('net');

// v--------socket connection to server

var server = net.createConnection(8080, 'localhost',() => {
  console.log('Connected');
});

server.on('connect', () => {
  process.stdin.pipe(server);

  server.on('data', (request) => {
    process.stdout.write(request);
  });

  server.end('data', () => {
    console.log('Connection closed');
  });
});

