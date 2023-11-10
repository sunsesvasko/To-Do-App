// MODULES

const path = require('path');
const express = require('express');
const cookieParser = require('cookie-parser');

const viewRoutes = require('./routes/viewRoutes');

const app = express();

// Set view engine and views folder
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// GLOBAL MIDDLEWARES

// body parser to access data in req.body
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }))

// cookie parser to access cookies in req.cookies
app.use(cookieParser());

// set static folder
app.use(express.static(path.join(__dirname, 'public')));

// Routes

app.use('/', viewRoutes);

module.exports = app;