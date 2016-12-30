const net = require('net');
const timestamp = new Date();
const staticContent = require('./staticContent');

var server = net.createServer((socket) => {

  socket.setEncoding('utf8');

  socket.on('data', (chunk) => {

    var string = chunk;
    var split = string.split(" ");

    var header = `\nHTTP/1.1 200 OK
    \nServer: nginx/1.4.6 (Ubuntu)
    \nDate: ${timestamp}
    \nContent-Type: text/html; charset=utf-8
    \nContent-Length: 40489
    \nConnection: keep-alive\n`;

    if(split[0] === "HEAD") {
      console.log('split0', split[0]);
      process.stdout.write(header);
    }
    else if(split[0] === "GET") {
      if (split[1] === "/") {
        process.stdout.write(header + staticContent.index_html);
      }
      else if (split[1] === "/index.html") {
        process.stdout.write(header + staticContent.index_html);
      }
      else if (split[1] === "/hydrogen.html") {
        process.stdout.write(header + staticContent.hydrogen_html);
      }
      else if (split[1] === "/helium.html") {
        process.stdout.write(header + staticContent.helium_html);
      }
      else if (split[1] === "/404.html") {
        process.stdout.write(header + staticContent.error_html);
      }
      else if (split[1] === "/css/styles.css") {
        process.stdout.write(header + staticContent.styles_css);
      }
      else {
        process.stdout.write(header + staticContent.error_html);
      }
    }
  });
});

server.listen(8080, 'localhost', () => {
  console.log('opened server on', server.address());
});