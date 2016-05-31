var http = require('http');

http.createServer(function (request, response) {
	
	if (request.url == '/produtos') {
		response.end("<html><body>Listando os produtos da loja</body></html>")
	} else {
		response.end("<html><body>Home da Casa do Codigo</body></html>")
	}
	
}).listen(3000, 'localhost');

console.log("Servidor funfando");