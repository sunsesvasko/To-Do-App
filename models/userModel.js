const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'A user must have a name']
    },
    email: {
        type: String,
        required: [true, 'A user must have an email'],
        unique: true,
        lowercase: true,
        trim: true,
        validate: [validator.isEmail, 'Please provide a valid email']
    },
    password: {
        type: String,
        required: [true, 'A user must have a password'],
        minlength: [8, 'A password must have at least 8 characters.'],
        select: false
    },
    passwordConfirm: {
        type: String,
        required: [true, 'Password must be confirmed.'],
        validate: {
            validator: function(el) {
                return el === this.password ? true : false;
            },
            message: 'Passwords are not the same!'
        }
    }
});

// MIDDLEWARE

// Hashing user password
userSchema.pre('save', async function(next) {
    if(!this.isModified('password')) return next();

    this.password = await bcrypt.hash(this.password, 12);
    this.passwordConfirm = undefined;

    next();
});


// METHODS

const User = mongoose.model('User', userSchema);

module.exports = User;