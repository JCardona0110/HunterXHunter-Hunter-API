// hunter x hunter api where people can request data regarding the different hunters in the anime/manga's universe
// attributes that users can request per hunter will include: name, age, gender, state(d or a) affiliation, occupation, nen type, nen abilites
require('dotenv').config();
const express = require('express');
const ejs = require('ejs');
const app = express();
// connect to DB
let db;
let dbConnectionString = process.env.DB_STRING;
let dbName = 'Hunter';

const MongoClient = require('mongodb').MongoClient;
MongoClient.connect(dbConnectionString).then((client) => {
	console.log(`Connected to ${dbName} Database`);
	db = client.db(dbName);
});

// connect to server
let PORT;
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // To parse the incoming requests with JSON payloads

app.listen(process.env.PORT || PORT, () => {
	console.log(`the server is now running on port ${PORT}! Betta go catch it!`);
});

let hunters = [
	{
		name: 'Gon Freecss',
		age: 14,
		gender: 'male',
		status: 'alive',
		affiliation: 'Hunter Association',
		occupation: 'Rookie Hunter',
		nenType: 'Enhancer',
		nenSpecial: 'Jajanken',
	},

	{
		name: 'Killua Zoldyck',
		age: 14,
		gender: 'male',
		status: 'alive',
		affiliation: 'Hunter Association',
		occupation: 'Rookie Hunter',
		nenType: 'transmuter',
		nenSpecial: 'Godspeed',
	},
];

app.get('/', (req, res) => {
	res.json(hunters);
});
