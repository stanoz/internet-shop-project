const express = require('express');
const cookieParser = require('cookie-parser')
const cors = require('cors')

const userRoutes = require('./routes/user')
const productRoutes = require('./routes/product')
const adminRoutes = require('./routes/admin')
const categoryRoutes = require('./routes/category')
const discountRoutes = require('./routes/discount')
const promotionRoutes = require('./routes/promotion')
const cartRoutes = require('./routes/cart')
const orderRoutes = require('./routes/order')
const returnRoutes = require('./routes/return')
const emailRoutes = require('./routes/email')
const globalErrorHandler = require('./utils/global-error-handler')

const mongoose = require('mongoose')
const authenticate = require("./security/authenticateJWT");

const app = express();

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}))
app.use(express.json())
app.use(cookieParser())

app.use('/products', productRoutes)
app.use('/users', userRoutes)
app.use('/admin', authenticate, adminRoutes)
app.use('/category', categoryRoutes)
app.use('/discount', discountRoutes)
app.use('/promotion', promotionRoutes)
app.use('/cart', cartRoutes)
app.use('/order', orderRoutes)
app.use('/return', returnRoutes)
app.use('/email', authenticate, emailRoutes)

app.use(globalErrorHandler.errorHandler)

mongoose.connect('mongodb://user:password@localhost:27017/mongo_internet_shop', {})
    .then(async () => {
        console.log('Connected to MongoDB');
        app.listen(3000)
    })
    .catch((err) => {
        console.error('Error connecting to MongoDB:', err.message)
    })
