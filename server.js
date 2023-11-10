// Modules

// access to process.env
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const mongoose = require('mongoose');

// Error Handler
process.on('uncaughtException', err => {
    console.log('UNCAUGHT EXCEPTION!');
    console.log(err.name, err.message);
    process.exit(1);
})

const app = require('./app');

const DB = process.env.DATABASE.replace('<password>', process.env.DATABASE_PASSWORD);

mongoose.connect(DB).then(() => console.log('DB Connection Successful!'));

const port = process.env.PORT;

const server = app.listen(port, () => console.log(`App Running on Port: ${port}`));
