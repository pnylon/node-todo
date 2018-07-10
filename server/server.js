let express = require('express');
let bodyParser =require('body-parser'); 

let {mongoose} = require('./db/mongoose');
let {Todo} = require('./models/todo');
let {User} = require('./models/user');

let app = express();

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

app.listen(3000, () => {
    console.log('Port 3000 is online');
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