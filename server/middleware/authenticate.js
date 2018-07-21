// Import User from user.js so it can be used here.
let {User} = require('./../models/user');

// Call this function in server.js in --- app.get('/users/me', authenticate, (req, res) =>  --- and where it's needed/
let authenticate = (req, res, next) => {
    let token = req.header('x-auth');

    User.findByToken(token).then((user) => {
        if (!user) {
            // Return Promise.reject() and it will call catch()
            return Promise.reject();
        }

        req.user = user;
        req.token = token;
        // Call next() so the function below will execute.
        next();
    }).catch((error) => {
        res.status(401).send();
    });
};

// Export authenticate
module.exports = {authenticate};