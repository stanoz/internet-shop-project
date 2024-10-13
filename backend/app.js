const express = require('express');

const userRoutes = require('./routes/user')

const mongoose = require('mongoose')


const app = express();

app.use('/users',userRoutes)

mongoose.connect('mongodb://user:password@localhost:27017/mongo_internet_shop', {})
    .then(async () => {
        console.log('Connected to MongoDB');
        app.listen(3000)
    })
    .catch((err) => {
        console.error('Error connecting to MongoDB:', err.message)
    })
