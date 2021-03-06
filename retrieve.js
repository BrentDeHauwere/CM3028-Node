// Let's require/import the mongodb native drivers.
var mongodb = require('mongodb');

// And our HTTP server
var http = require('http');

// Setup our port
var port = process.env.PORT || 1337;

// Connection URL. This is where your mongodb server is running.
var url = 'mongodb://root:root@ds050869.mlab.com:50869/cm3028-node-1611827';

// We need to work with "MongoClient" interface in order to connect to a mongodb server.
var MongoClient = mongodb.MongoClient;

http.createServer(function(request, response) {
	response.writeHead(200, { 'Content-Type': 'text/plain' });
	response.write('Connecting \n');

	// Use connect method to connect to the Server
	MongoClient.connect(url, function (err, db) {
		response.write('Connection Made \n');
		if (err) {
			response.write('Unable to connect to the mongoDB server. Error:' + err + "\n");
			//Error so close connection
			db.close();
		} else {
			//HURRAY!! We are connected. :)
			response.write('Connection established to' + url +"\n");

			var collection = db.collection('users');
			var results = collection.find({name: 'modulus user'});
			results.each(function (err, result)
			{
				//if the result is null, there are no more results, it’s ok to close everything
				if (result == null) {
					response.write("No results")
				}
				if (err) {
					response.write(err);
				} else {
					response.write('Fetched: ' + result.name + " : " + result.age + " : " + result.roles.toString() +'\n');
				}
				db.close();
				response.end('DB closed');
			});
		}
	});

}).listen(port);