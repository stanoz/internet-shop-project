const express = require('express');

const userRoutes = require('./routes/user')
const productRoutes = require('./routes/product')
const adminRoutes = require('./routes/admin')
const categoryRoutes = require('./routes/category')

const mongoose = require('mongoose')

const app = express();

app.use(express.json())

app.use('/products', productRoutes)
app.use('/users', userRoutes)
app.use('/admin', adminRoutes)
app.use('/category', categoryRoutes)

mongoose.connect('mongodb://user:password@localhost:27017/mongo_internet_shop', {})
    .then(async () => {
        console.log('Connected to MongoDB');
        app.listen(3000)
    })
    .catch((err) => {
        console.error('Error connecting to MongoDB:', err.message)
    })
