const {ObjectID} = require('mongodb');
const express = require('express');
const bodyParser =require('body-parser'); 

const {mongoose} = require('./db/mongoose');
const {Todo} = require('./models/todo');
const {User} = require('./models/user');

let app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

// crud - Create Read Update Delete
app.post('/todos', (req, res) => {
    let todo = new Todo({
        text: req.body.text
    });

    todo.save().then((doc) => {
        res.send(doc);
    }, (e) => {
        res.status(400).send(e);
    });    
});

app.get('/todos', (req, res) => {
    Todo.find().then((todos) => {
        res.send({ todos });
    }, (error) => {
        res.status(400).send(error);
    });
});

app.get('/todos/:id', (req, res) => {
    let id = req.params.id;
    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }

    Todo.findById(id).then((todo) => {
        if (!todo) {
            return res.status(404).send();
        }
        res.send({todo});
    }).catch((error) => {
        return res.status(400).send();
    });
});

app.delete('/todos/:id', (req, res) => {
    let id = req.params.id;
    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }

    Todo.findByIdAndRemove(id).then((todo) => {
        if (!todo) {
            return res.status(404).send();
        }
        res.send({todo});
    }).catch((error) => {
        return res.status(400).send();
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
//     name: 'Adrian Goo',
//     email: 'adrian@goo.com'
// });

// newUser.save().then((doc) => {
//     console.log('Saved User', doc)
// }, (e) => {
//     console.log('Unable to create User', e);
// })