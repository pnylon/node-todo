const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

// Remove all, doesn't return anything useful
// Todo.remove({}).then((res) => {
//     console.log(res);
// });

Todo.findOneAndRemove({_id: '5b4a1337c372cfb6d89da077'}).then((todo) => {
    console.log(todo);
});

Todo.findByIdAndRemove('5b4a1337c372cfb6d89da077').then((todo) => {
    console.log(todo);
});