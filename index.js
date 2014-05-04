var Hapi = require('hapi');

// Create a server with a host and port
var server = Hapi.createServer('0.0.0.0', 7777);

server.route({
	method: "GET",
	path: "/",
	config: {
		handler: function (req, reply) {
			var Request = require('request');
			Request('http://cdn.spectrumbranch.com/server/markets.php', function(err, response, body) {
				if (!err && response.statusCode == 200) {
					var data = JSON.parse(body);
					var organizer = require('./lib/organizer');
					reply(organizer.process(data.return));
				}
			});
		}
	}
});
// Start the server
server.start();
console.log('up');
