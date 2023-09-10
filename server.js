// hunter x hunter api where people can request data regarding the different hunters in the anime/manga's universe
// attributes that users can request per hunter will include: name, age, gender, state(d or a) affiliation, occupation, nen type, nen abilites
const express = require("express");
const ejs = require("ejs");
const app = express();
const MongoClient = require("mongodb").MongoClient;
require("dotenv").config();

// connect to DB
let db;
let dbConnectionString = process.env.DB_STRING;
let dbName = "Hunter";

MongoClient.connect(dbConnectionString).then((client) => {
	console.log(`Connected to ${dbName} Database`);
	db = client.db(dbName);
});

// connect to server
let PORT = process.env.PORT;
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // To parse the incoming requests with JSON payloads

app.listen(PORT, () => {
	console.log(`the server is now running on port ${PORT}! Betta go catch it!`);
});

app.get("/", (request, response) => {
	db.collection("Hunters")
		.find()
		.toArray()
		.then((data) => {
			response.render("index.ejs", { info: data });
		})
		.catch((error) => console.error(error));
});

app.post("/addHunter", (request, response) => {
	db.collection("Hunters")
		.insertOne(request.body.name)
		.then((result) => {
			console.log("Hunter Added");
			response.redirect("/");
		})
		.catch((error) => console.error(error));
});

app.delete("/deleteHunter", (request, response) => {
	db.collection("Hunters")
		.deleteOne({ stageName: request.body.stageNameS })
		.then((result) => {
			console.log("Hunter Deleted");
			response.json("Hunter Deleted");
		})
		.catch((error) => console.error(error));
});
