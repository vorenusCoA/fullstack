// Modulo Net provisto por Node
var net = require('net');
var clientes = [];

net.createServer(function (socket) {

	//identificamos la conexión y la agregamos al array de clientes
	socket.name = socket.remoteAddress + ":" + socket.remotePort
	clients.push(socket);

	//mensaje de bienvenida y aviso a todos los conectados quién se conectó
	socket.write("Welcome " + socket.name + "\n");
	broadcast(socket.name + " joined the chat\n", socket);

	//envío de mensajes recibidos
	socket.on('data', function (data) {
		broadcast(socket.name + "> " + data, socket);
	});

	//eliminar personas que se desconectan
	socket.on('end', function () {
		clients.splice(clients.indexOf(socket), 1);
		broadcast(socket.name + " left the chat.\n");
	});

	//envío de mensajes para todos los conectados menos al que lo envía
	function broadcast(message, sender) {
		clients.forEach(function (client) {		
		if (client === sender) return;
		client.write(message);
    });
		process.stdout.write(message)
  }

}).listen(5000);

console.log("Chat server running at port 5000\n");
