const express = require('express');
const cookieParser = require('cookie-parser')
const cors = require('cors')

const userRoutes = require('./routes/user')
const productRoutes = require('./routes/product')
const adminRoutes = require('./routes/admin')
const categoryRoutes = require('./routes/category')

const mongoose = require('mongoose')
const authenticate = require("./security/authenticateJWT");
const exceptionHandler = require("./utils/validation-exception-handler");

const app = express();

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}))
app.use(express.json())
app.use(cookieParser())

app.use('/', exceptionHandler)
app.use('/products', productRoutes)
app.use('/users', userRoutes)
app.use('/admin', authenticate, adminRoutes)
app.use('/category', categoryRoutes)

mongoose.connect('mongodb://user:password@localhost:27017/mongo_internet_shop', {})
    .then(async () => {
        console.log('Connected to MongoDB');
        app.listen(3000)
    })
    .catch((err) => {
        console.error('Error connecting to MongoDB:', err.message)
    })
