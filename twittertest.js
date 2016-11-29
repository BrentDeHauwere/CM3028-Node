// The first thing we need to do is let node.js know we require the Twitter library
var Twitter = require('twitter');
var http = require('http');
var port = process.env.PORT || 1337;

var client = new Twitter({
	consumer_key: 'LULonHhwbfxqolOc3XcB1EMV7',
	consumer_secret: 'ESaYdaqdNklLGLn1VfRlrOKek86crvTca1ydewNqYb2R8oykdM',
	access_token_key: '464137167-tF6rYBOrEgfuZ1IVSR0z1r3MESUNgLJx24hAnkEd',
	access_token_secret: 'vmLg9rmJ1lNDNZcBtC3X9u1PIoNlIw5BQaUKvrYdFoajM'
});

http.createServer(function(request, response) {
	// Content type = JSON.
	// JSON can be stopped by cross domain requests,
	// so we add and universal Access control Origin, this allows any site to consume our JSON.
	response.writeHead(200, { 'Content-Type': 'application/json',
		'Access-Control-Allow-Origin' : '*' });

	client.get('search/tweets', {q: 'lolcats'}, function(error, tweets){
		response.end(JSON.stringify(tweets));
	});

}).listen(port);