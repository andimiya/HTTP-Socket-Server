const net = require('net');
const timestamp = new Date();
const staticContent = require('./staticContent');

var server = net.createServer((socket) => {

  socket.setEncoding('utf8');

  socket.on('data', (chunk) => {

    var string = chunk;
    var split = string.split(" ");

    var header = `HTTP/1.1 200 OK
    Server: nginx/1.4.6 (Ubuntu)
    Date: ${timestamp}
    Content-Type: text/html; charset=utf-8
    Content-Length: 40489
    Connection: keep-alive\n`;

    if(split[0] === "HEAD") {
      console.log('split0', split[0]);
      socket.write(header);
    }
    else if(split[0] === "GET") {
      if (split[1] === "/") {
        socket.write(header + staticContent.index_html);
      }
      else if (split[1] === "/index.html") {
        socket.write(header + staticContent.index_html);
      }
      else if (split[1] === "/hydrogen.html") {
        socket.write(header + staticContent.hydrogen_html);
      }
      else if (split[1] === "/helium.html") {
        socket.write(header + staticContent.helium_html);
      }
      else if (split[1] === "/404.html") {
        socket.write(header + staticContent.error_html);
      }
      else if (split[1] === "/css/styles.css") {
        socket.write(header + staticContent.styles_css);
      }
      else {
        socket.write(header + staticContent.error_html);
      }
    }
    socket.end();
  });
});

server.listen(8080, 'localhost', () => {
  console.log('opened server on', server.address());
});