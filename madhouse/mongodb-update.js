//const MongoClient = require('mongodb').MongoClient;
// Destructure the mongodb
const {MongoClient, ObjectID} = require('mongodb');

// Version 3
MongoClient.connect('mongodb://localhost:27017/TodoApp', (error, client) => {
    if (error) {
        return console.log('Unable to connect to MongoDB server');
    }
    console.log('Connected to MongoDB server');
    const db = client.db('TodoApp');

    // db.collection('Todos').findOneAndUpdate({
    //     _id: new ObjectID('5b3ff7a547dc5a608c39bad7')
    // }, {
    //     $set: {
    //         completed: true
    //     }
    // }, {
    //     returnOriginal: false
    // }).then((result) => {
    //     console.log(result);
    // });

    db.collection('Users').findOneAndUpdate({
        _id: new ObjectID('5b3e39978aead81265143e5a')
    }, {
            $set: {
                name: 'Cat Meowee'
            }, $inc: {
                age: 1
            }
        }, {
            returnOriginal: false
        }).then((result) => {
            console.log(result);
        });    

    //client.close();
});


