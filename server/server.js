require('./config/config');

const _ = require('lodash');
const {ObjectID} = require('mongodb');
const express = require('express');
const bodyParser =require('body-parser'); 

let {mongoose} = require('./db/mongoose');
let {Todo} = require('./models/todo');
let {User} = require('./models/user');
let {authenticate} = require('./middleware/authenticate')

let app = express();
const port = process.env.PORT;

app.use(bodyParser.json());

// crud - Create Read Update Delete
app.post('/todos', authenticate, (req, res) => {
    let todo = new Todo({
        text: req.body.text,
        _creator: req.user._id
    });

    todo.save().then((doc) => {
        res.send(doc);
    }, (e) => {
        res.status(400).send(e);
    });    
});

app.get('/todos', authenticate, (req, res) => {
    Todo.find({
        _creator: req.user._id
    }).then((todos) => {
        res.send({ todos });
    }, (error) => {
        res.status(400).send(error);
    });
});

app.get('/todos/:id', authenticate, (req, res) => {
    let id = req.params.id;
    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }

    Todo.findOne({
        _id: id,
        _creator: req.user._id
    }).then((todo) => {
        if (!todo) {
            return res.status(404).send();
        }
        res.send({todo});
    }).catch((error) => {
        return res.status(400).send();
    });
});

app.delete('/todos/:id', authenticate, (req, res) => {
    let id = req.params.id;
    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }

    Todo.findOneAndRemove({
        _id: id,
        _creator: req.user._id
    }).then((todo) => {
        if (!todo) {
            return res.status(404).send();
        }
        res.send({todo});
    }).catch((error) => {
        return res.status(400).send();
    });
});

// In Postman - Patch -> body -> raw -> json (application/json).
app.patch('/todos/:id', authenticate, (req, res) => {
    let id = req.params.id;
    let body = _.pick(req.body, ['text', 'completed']);
    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }

    if (_.isBoolean(body.completed) && body.completed) {
        body.completedAt = new Date().getTime();
    } else {
        body.completed = false;
        // Remove from database.
        body.completedAt = null;
    }

    Todo.findOneAndUpdate({
        _id: id,
        _creator: req.user.id
    }, {$set: body}, {new: true}).then((todo) => {
        if (!todo) {
            return res.status(404).send();
        }

        res.send({todo});
    }).catch((error) => {
        res.status(400).send();
    });
});

app.post('/users', (req, res) => {
    let body = _.pick(req.body, ['email', 'password']);
    let user = new User(body);

    //user.save().then((user) => {
    user.save().then(() => {
        // Return user.generagetAuthToken since we know we're expecting a chaining promise, 
        // and move commented line down to a new then() call.
        return user.generateAuthToken();
        //res.send(user);
    }).then((token) => {
        // Add custom header with x-auth for our purpose.
        res.header('x-auth', token).send(user);
    }).catch((error) => {
        res.status(400).send(error);
    });
});

app.get('/users/me', authenticate, (req, res) => {
    res.send(req.user);
});

app.post('/users/login', (req, res) => {
    let body = _.pick(req.body, ['email', 'password']);

    User.findByCredentials(body.email, body.password).then((user) => {
        // For early testing in postman
        //res.send(user);
        return user.generateAuthToken().then((token) => {
            res.header('x-auth', token).send(user);
        });
    }).catch((error) => {
        res.status(400).send();
    });
});

app.delete('/users/me/token',authenticate, (req, res) => {
    req.user.removeToken(req.token).then(() => {
        res.status(200).send();
    }, () => {
        res.status(400).send();
    });
});

app.listen(port, () => {
    console.log(`Started on port ${port}`);
});

module.exports = {app};

// let newTodo = new Todo({
//     text: '  Blow this joint   '
// });

// newTodo.save().then((doc) => {
//     console.log('Saved Todo', doc)
// }, (e) => {
//     console.log('Unable to create todo', e);
// })

// let newUser = new User({
//     name: 'Moby Goo',
//     email: 'moby@goo.com'
// });

// newUser.save().then((doc) => {
//     console.log('Saved User', doc)
// }, (e) => {
//     console.log('Unable to create User', e);
// })