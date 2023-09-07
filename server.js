// hunter x hunter api where people can request data regarding the different hunters in the anime/manga's universe
// attributes that users can request per hunter will include: name, age, gender, state(d or a) affiliation, occupation, nen type, nen abilites
const express = require('express');
const ejs = require('ejs');
const app = express();
const PORT = 8888;

app.listen(process.env.PORT || PORT, () => {
	console.log(`the server is now running on port ${PORT}! Betta go catch it!`);
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // To parse the incoming requests with JSON payloads

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
const MongoClient = require('mongodb').MongoClient;
MongoClient.connect(
	'mongodb+srv://cardona:hunter123@huntercluster.s0sqtoa.mongodb.net/'
).then((client) => {
	console.log('Connected to Database');
});
