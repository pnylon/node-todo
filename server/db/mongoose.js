let mongoose = require('mongoose');

mongoose.Promise = global.Promise;
// mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true }, (error, db) => {
//     if (error) {
//         return console.log('Unable to connect to MongoDB sever');
//     }
//     console.log('Connected to mongoDB server');
//     db.close();
// }, );

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true
}).then((db) => {
    console.log('MongoDB TodoApp is connected')
}).catch((error) => {
    console.log(error)
})

// let connection = mongoose.connect('mongodb://localhost:27017/TodoApp', {
//     useMongoClient: true
// }).then(db => {
//     console.log('MongoDB is connected')
// }).catch(error => {
//     console.log(error)
// })

module.exports = {mongoose};
