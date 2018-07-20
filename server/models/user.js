const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');

let UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        minlength: 1,
        trim: true,
        unique: true,
        validate: {
            validator: validator.isEmail,
            message: '{VALUE} is not a valid email'
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 8
    },
    tokens: [{
        access: {
            type: String,
            required: true
        },
        token: {
            type: String,
            required: true
        }
    }]
});

// Use a regular function here to get access to the this
UserSchema.methods.toJSON = function () {
    let user = this;
    let userObject = user.toObject();

    return _.pick(userObject, ['_id', 'email']);
};

UserSchema.methods.generateAuthToken = function () {
    let user = this;
    let access = 'auth';
    let token = jwt.sign({_id: user._id.toHexString(), access}, 'abc123').toString();

    // push() may cause issues.
    // user.tokens.push({access, token});
    user.tokens = user.tokens.concat([{access, token}]);

    // Instead of chaining promises, return the whole thing  to just return a value. The value will get
    // passed as the success argument for the next then() call.
    // From 90.Generating Auth Tokens and Setting Headers - 17:25
    return user.save().then(() => {
        return token;
    });
};

let User = mongoose.model('User', UserSchema);

module.exports = {User};



// validate: {
//     validator: (value) => {
//         return validator.isEmail(value);
//     },
//         message: '{VALUE} is not a valid email'
// }