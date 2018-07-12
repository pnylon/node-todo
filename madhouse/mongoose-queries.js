const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

let id = '5b4618b5f623d4105043dbfa';
let userId = '5b4249b9549c4935ab96bf91';

if (!ObjectID.isValid(id)) {
    console.log('ID is not valid');
}
if (!ObjectID.isValid(userId)) {
    console.log('User is not valid');
}

// With find you get back and array - [{}].
// With mongoose you can just usethe variable "id" and you don't need to use "new ObjectID"
// Todo.find({
//     _id: id
// }).then((todos) => {
//     console.log('Todos', todos);
// });

// With findOne you get back the document - {}.
// Todo.findOne({
//     _id: id
// }).then((todo) => {
//     console.log('Todo', todo);    
// });

// Using only the ID.
// Todo.findById(id).then((todo) => {
//     if (!todo) {
//         return console.log('ID not found');
//     }
//     console.log('Todo by id', todo);
// }).catch((e) => console.log(e));


// User.findById(userId).then((user) => {
//     if(!user) {
//         return console.log('User not found');
//     }
//     console.log('User:', user);
// }).catch((e) => console.log(e));

User.findById(userId).then((user) => {
    if (!user) {
        console.log('User not found');
    }
    console.log(JSON.stringify(user, undefined, 2));
}, (e) => {
    console.log(e);
});