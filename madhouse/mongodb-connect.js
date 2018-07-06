//const MongoClient = require('mongodb').MongoClient;
// Destructure the mongodb
const {MongoClient, ObjectID} = require('mongodb');

// var obj = new ObjectID();
// console.log(obj);

// Destructuring
// var user = {name: 'Poo', age: 4};
// var {name} = user;
// console.log(name);

// Version 3
MongoClient.connect('mongodb://localhost:27017/TodoApp', (error, client) => {
    if (error) {
        return console.log('Unable to connect to MongoDB server');
    }
    console.log('Connected to MongoDB server');
    const db = client.db('TodoApp');

    // db.collection('Todos').insertOne({
    //     text: 'Do something great right now',
    //     completed: false
    // }, (error, result) => {
    //     if (error) {
    //         return console.log('Unable to insert todo', error);
    //     }
    //     console.log(JSON.stringify(result.ops, undefined, 2));
    // });

    // db.collection('Users').insertOne({
    //     name: 'Pierce Nylon',
    //     age: 330,
    //     location: 'Earth'
    // }, (error, result) => {
    //     if (error) {
    //         return console.log('Unable to insert user', error);
    //     }
    //     //console.log(JSON.stringify(result.ops, undefined, 2));
    //     console.log(result.ops[0]._id.getTimestamp());
    // });

    client.close();
});



// Version 2
/*const MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/TodoApp', (error, db) => {
    if (error) {
        return console.log('Unable to connect to MongoDB server');
    }
    console.log('Connected to MongoDB server');

    db.collection('Todos').insertOne({
        text: 'Do something great right now',
        completed: false
    }, (error, result) => {
        if (error) {
            return console.log('Unable to insert todo', error);
        }
        console.log(JSON.stringify(result.ops, undefined, 2));
    });

    db.close();
});*/