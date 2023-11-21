const jwt = require('jsonwebtoken');
const User = require('./../models/userModel');
const AppError = require('./../utils/appError');
const catchAsync = require('./../utils/catchAsync');
const { promisify } = require('util');

const signToken = id => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    })
}

const createSendToken = (user, statusCode, res) => {
    const token = signToken(user._id) || signToken(user.id);

    const cookieOptions = {
        expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000),
        httpOnly: true,
        secure: true
    };

    res.cookie('jwt', token, cookieOptions);

    res.status(statusCode).json({
        status: 'success',
        token,
        data: {
            user
        }
    })
}

exports.login = catchAsync(async(req, res, next) => {
    const { email, password } = req.body;

    // Check if email and password are input
    if(!email || !password) return next(new AppError('Please provide email and password!'), 400)
    // Check if user exists or the password is correct
    const user = await User.findOne({ email }).select('+password');
    if(!user || !await user.correctPassword(password, user.password)) return next(new AppError('Wrong credentials!', 401));

    createSendToken(user, 200, res);
});

exports.signup = catchAsync(async(req, res, next) => {
    const newUser = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        passwordConfirm: req.body.passwordConfirm
    });

    newUser.password = undefined;

    createSendToken(newUser, 201, res);
});

exports.logout = catchAsync(async(req, res, next) => {
    res.cookie('jwt', 'loggedout', {
        expires: new Date(Date.now() + 3 * 1000),
        httpOnly: true
    });

    res.status(200).json({ 'status': 'success' });
});

exports.protect = catchAsync(async(req, res, next) => {
    let token;

    // 1) Get token and check if it's there
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    } else if(req.cookies.jwt) {
        token = req.cookies.jwt;
    }

    if(!token) return next(new AppError('You aren\'t logged in! Please log in to get access.'), 401);

    // 2) Verification token
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    // 3) Check if user still exists
    const user = await User.findById(decoded.id);
    if(!user) return next(new AppError("This user doesn't exist"), 401);

    // GRANT ACCESS TO PROTECTED ROUTE
    req.user = user;
    res.locals.user = user;
    next();
})

exports.isLoggedIn = async(req, res, next) => {
    if(req.cookies.jwt) {
        try {
            // 1) Verify token
            const decoded = await promisify(jwt.verify)(req.cookies.jwt, process.env.JWT_SECRET);

            // 2) Check if user still exists
            const user = await User.findById(decoded.id);
            if(!user) return next();

            // There is a logged in user
            res.locals.user = user;
            return next();
        } catch(err) {
            return next;
        }
    }
    next();
}