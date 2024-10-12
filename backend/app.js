const express = require('express');

const indexRouter = require('./routes/index')

const mongoose = require('mongoose')

const app = express();

app.get('/',indexRouter);

mongoose.connect('mongodb://user:password@localhost:27017/mongo_internet_shop', {})
    .then(() => {
        console.log('Connected to MongoDB');
        app.listen(3000)
    })
    .catch((err) => {
        console.error('Error connecting to MongoDB:', err.message);
    });
// module.exports = app;
