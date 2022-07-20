const express = require('express');
const BodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;
const { getAllTypes, parseType } = require('./utils'); 
require('dotenv').config();


let database;
let collection;
let app = express();

app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));


MongoClient.connect(process.env.CONNECTION_URL, { useNewUrlParser: true }, (error, client) => {
    if (error)
        throw error;
    database = client.db(process.env.DATABASE_NAME);
    collection = database.collection("jlpt");
    console.log(`Connect to ${process.env.DATABASE_NAME}`);
})

app.get('/', (req, res) => {
    res.send("Home");
})

/*              ALL TYPES OF WORDS
    "Noun"
    "Adverbial Noun"
    "Verb",
    "Ichidan verb"
    "Transitive verb"
    "Pre-noun adjectival"
    "Adverb",
    "Godan verb"
    "Intransitive verb"
    "Adjective"
    "na-adjective"
    "i-adjective"
    "Suffix"
    "Expression"
    "Prefix"
    "Adverbial noun"
    "Pronoun"
    "Temporal noun"
    "Katakana"
    "Numeric"
    "Conjunction"
    "Wasei"
*/
app.get('/type/:type', (req ,res) => {

    const type = req.params.type;
    
    collection.find({types: parseType(type)}).toArray((err, docs) => {
        if (err) {
            console.log(err);
            throw err;
        }
        res.status(200).json(docs);

    })
})

app.get('/level/:level', (req, res) => {
    const level = parseInt(req.params.level);
    console.log(`Le level est : ${level}`);
    res.send(level);
    /*collection.find({"level": level}).toArray((err, docs) => {
        if (err) {
            console.log(err);
            throw err;
        }
        res.status(200).json(docs);
    })*/

})

app.get('/type/:type/level/:level', (req, res) => {
    const level = parseInt(req.params.level);
    const type = req.params.type;
    collection.find({"level": level, types: parseType(type)}).toArray((err, docs) => {
        if (err) {
            console.log(err);
            throw err;
        }
        res.status(200).json(docs);
    })

})

app.get('/level/:level/type/:type', (req, res) => {
    const level = parseInt(req.params.level);
    const type = req.params.type;
    collection.find({"level": level, types: parseType(type)}).toArray((err, docs) => {
        if (err) {
            console.log(err);
            throw err;
        }
        res.status(200).json(docs);
    })

})


app.listen(process.env.PORT || 5000, () => {
   console.log("Connected on PORT 5000!");
});