const Express = require('express');
const BodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;
require('dotenv').config();


let database;
let collection;
let app = Express();

app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));



app.listen(5000, () => {
    MongoClient.connect(process.env.CONNECTION_URL, { useNewUrlParser: true }, (error, client) => {
        if (error)
            throw error;
        database = client.db(process.env.DATABASE_NAME);
        collection = database.collection("jlpt");
        console.log(`Connect to ${process.env.DATABASE_NAME}`);
    })
});