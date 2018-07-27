const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcryptjs');

//mongoose.plugin(schema => { schema.options.usePushEach = true });

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

//UserSchema.options.usePushEach = true;

// Use a regular function here to get access to the this
UserSchema.methods.toJSON = function () {
    let user = this;
    let userObject = user.toObject();

    return _.pick(userObject, ['_id', 'email']);
};

// Instance methods get called with the individual document (user = this).
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

UserSchema.methods.removeToken = function(token) {
    let user = this;

    // return to chain together the call made in server.js. 
    return user.update({
        // $pull - mongo db operator
        $pull: {
            tokens: {token}
        }
    });
};

//  Using "statics" - everything you add onto it turns into a model method as opposed to an instance method.
// Capital U - Model methods get called with the model as the this binding (User = this).
UserSchema.statics.findByToken = function (token) {
    let User = this;
    // Set decoded as undefined.
    let decoded;

    // The jwt.verify is going to throw an error if anything goes wrong, if the secret doesn't match, or if the token value was manipulated.
    try {
        decoded = jwt.verify(token, 'abc123');
    } catch (error) {
        // return new Promise((resolve, reject) => {
        //     reject();
        // });
        return Promise.reject();
    }

    // Quotes are required when you have a dot in the value (tokens.token), might want tokeep them consistant.
    return User.findOne({
        '_id':  decoded._id,
        'tokens.token': token,
        'tokens.access': 'auth'
    });
};

UserSchema.statics.findByCredentials = function(email, password) {
    let User = this;

    return User.findOne({email}).then((user) => {
        if (!user) {
            return Promise.reject();
        }

        // All of bcrypt methods only support callbacks.
        return new Promise((resolve, reject) => {
            bcrypt.compare(password, user.password, (error, result) => {
                if (result) {
                   resolve(user);
                } else {
                    reject();
                }
            });
        });
    });
};

// You have to provide the"next" argument and you have to call it in the function, otherwise the middleware 
// is never going to complete.
UserSchema.pre('save', function(next) {
    let  user = this;

    if (user.isModified('password')) {
        bcrypt.genSalt(10, (error, salt) => {
            bcrypt.hash(user.password, salt, (error, hash) => {
                user.password = hash;
                next();
            });
        });
    } else {
        next();
    }
});

let User = mongoose.model('User', UserSchema);

module.exports = {User};



// validate: {
//     validator: (value) => {
//         return validator.isEmail(value);
//     },
//         message: '{VALUE} is not a valid email'
// }