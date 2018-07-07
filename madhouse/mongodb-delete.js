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

    // deleteMany
    // db.collection('Todos').deleteMany({text: 'Go to the store'}).then((result) => {
    //     console.log(result);
    // });

    // deleteOne
    // db.collection('Todos').deleteOne({text: 'Fart'}).then((result) => {
    //     console.log(result);
    // });

    // findOneAndDelete
    // db.collection('Todos').findOneAndDelete({completed: false}).then((result) => {
    //     console.log(result);
    // });

    // db.collection('Users').deleteMany({name: 'Bob Dob'}).then((result) => {
    //     console.log(result);
    // });

    db.collection('Users').findOneAndDelete({ _id: new ObjectID('5b3e3befd279c813ab5fe1d2')}).then((results) => {
        console.log(JSON.stringify(results, undefined, 2));
    });

    //client.close();
});


