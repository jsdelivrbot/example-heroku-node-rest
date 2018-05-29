const express = require('express')
const path = require('path')
const mongodb = require('mongodb').MongoClient;
const PORT = process.env.PORT || 5000
const MONGO_DATABASE_URL = "mongodb://heroku_18br06r5:c8fpg755cta7dn6pttqm8578rn@ds135540.mlab.com:35540/heroku_18br06r5";
const MONGO_DATABASE_NAME = "heroku_18br06r5";
express()
	.use(express.static(path.join(__dirname, 'public')))
	.set('views', path.join(__dirname, 'views'))
	.get('/', (request, response) => {
		mongodb.connect(MONGO_DATABASE_URL, function(dataBaseError, client) {
			console.log(dataBaseError);
			const db = client.db(MONGO_DATABASE_NAME);
			const baseCollection = db.collection("base"); 
			baseCollection.insertMany([{a:1}, {b:2}], function(insertError, result){
				console.log(insertError);
			});
			client.close();
		});
		response.send("good");
	}).listen(PORT, () => console.log(`Listening on ${ PORT }`))
  
