const Express = require('express');
const BodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;
const fs = require('fs');
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
        collection.deleteMany({}, (err) => {
            if (err)
                throw err;
            console.log("Documents deleted!");
        })
        //Retrieve JLPT files stored in my Google Drive
        for (let i = 2; i <= 5; i++){
            let data = JSON.parse(fs.readFileSync(`./JLPT-${i}.json`));
            collection.insertMany(data, (err) => {
                if (err)
                    throw err;
                console.log("DB filled up!");
            })
        }
      
    })
});