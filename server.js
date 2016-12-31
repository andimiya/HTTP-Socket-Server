 const net = require('net'); //need to require net module to be able to use all the functions within it

const staticContent = require('./staticcontent.js');
const timeStamp = new Date();



//clientSocket is a readable and writeable stream
var server = net.createServer((clientSocket) => {

  //read data from socket as utf8 formatted text
  clientSocket.setEncoding('utf8');

clientSocket.on('data', (httpRequest) => {
  var split = httpRequest.split('\r\n');


  //parse the client's http request headers
  var requestLine = split[0];
  var requestLineSplit = requestLine.split(' ');
  var requestMethod = requestLineSplit[0];
  var requestURI = requestLineSplit[1];

  function generateResponseHeaders(statusCode,contentLength, contentType){

  var responseHeaders =`HTTP/1.1 ${statusCode}
Server: nginx/1.4.6 (Ubuntu)
Date: ${timeStamp}
Content-Type: ${contentType}
Content-Length: ${contentLength}\n\n`;

  return responseHeaders;
    //return headers as a string


  }


  if(requestMethod === 'GET'){
    if(requestURI === '/'){
      clientSocket.write(generateResponseHeaders('200 OK', staticContent.index_html.length, 'text/html; charset=utf-8') + staticContent.index_html);
      clientSocket.end();
    }else if (requestURI == '/index.html'){
      clientSocket.write(generateResponseHeaders('200 OK', staticContent.index_html.length, 'text/html; charset=utf-8') + staticContent.index_html);
      clientSocket.end();
    }else if(requestURI === '/hydrogen.html'){
      clientSocket.write(generateResponseHeaders('200 OK', staticContent.hydrogen_html.length, 'text/html; charset=utf-8') + staticContent.hydrogen_html);
      clientSocket.end();
    }else if(requestURI === '/helium.html'){
      clientSocket.write(generateResponseHeaders('200 OK', staticContent.helium_html.length, 'text/html; charset=utf-8') + staticContent.helium_html);
      clientSocket.end();
    // }else if(requestURI === '/404.html'){
    //   clientSocket.write(generateResponseHeaders(staticContent.error_html.length) + staticContent.error_html);
    //   clientSocket.end();
    }else if(requestURI === '/css/styles.css'){
      clientSocket.write(generateResponseHeaders('200 OK', staticContent.styles_css.length, 'text/css; charset=utf-8') + staticContent.styles_css);
      clientSocket.end();
    }else{
      clientSocket.write(generateResponseHeaders('404 NOT FOUND',staticContent.error_html.length, 'text/html; charset=utf-8') + staticContent.error_html);
      clientSocket.end();
    }
  }

});

});

server.listen(8080, 'localhost', ()=> {
  console.log('opened server on', server.address());

});