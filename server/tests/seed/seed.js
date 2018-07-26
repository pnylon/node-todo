// Get ObjectID from mongodb (using ES6 destructuring).
const {ObjectID} = require('mongodb');
const jwt = require('jsonwebtoken');

const {Todo} = require('./../../models/todo');
const {User} = require('./../../models/user');

// Get id first so you can use it more then once.
const userOneID = new ObjectID;
const userTwoID = new ObjectID;
const users = [{
    _id:  userOneID,
    email: 'amoga@pooftimer.com',
    password: 'userOnePass',
    tokens: [{
        access: 'auth',
        token: jwt.sign({ _id: userOneID, access: 'auth' }, 'abc123').toString()
    }]
}, {
    _id: userTwoID,
    email: 'beefoop@calaca.org',
    password: 'userTwoPass'
}]

// Dummie data for testing todos
const todos = [{
    _id: new ObjectID(),
    text: "first todo"
}, {
    _id: new ObjectID(),
    text: "second todo",
    completed: true,
    completedAt: 333
}];

const populateUsers = (done) => {
    User.remove({}).then(() => {
        // By calling save we are going to be running the middleware.
        let userOne = new User(users[0]).save();
        let userTwo = new User(users[1]).save();

        // Make sure the users success, or all the promises are resolved and successfully saved to the DB.
        return Promise.all([userOne, userTwo]);
    }).then(() => done());
};

const populateTodos = (done) => {
    Todo.remove({}).then(() => {
        return Todo.insertMany(todos);
    }).then(() => done());
};

module.exports = {todos, populateTodos, users, populateUsers};