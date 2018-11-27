var createServer = require('http').createServer;

var trace = require('jstrace');

createServer(function (req, res) {
	trace('request:start', {url: req.url});

	res.setHeader('content-type', 'application/json');

	var status, body;
	if (req.url === '/prognosis' && req.method === 'GET') {
		status = 200; body = {ok: true};
	} else {
		status = 404; body = {error: 'notfound'};
	}

	res.writeHead(status);
	res.end(JSON.stringify(body));

	trace('request:end', {statusCode: status, body: body});
}).listen(9999, function () { console.error('up'); });

// In different terminals, in this order:
// node 8_probe.js
// ./node_modules/jstrace/bin/jstrace -p 28815 8_watcher.j
// curl http://localhost:9999/prognosis

