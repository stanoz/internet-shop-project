const Order = require('../models/order')

exports.generateReport = async (req, res, next) => {
    if (req.user.email !== 'admin@example.com') {
        return res.status(403).json({message: 'Permission to edit order denied'})
    }

    try {
        const orders = await Order.find()
            .populate({
                path: 'cart.items.product',
                populate: {
                    path: 'category',
                    model: 'Category'
                }
            })
            .lean();

        if (!orders || orders.length === 0) {
            throw new Error('No orders found!');
        }

        let totalCost = 0;
        const ordersPerUser = {};
        const productsSold = {};
        const categoriesSold = {};

        for (const order of orders) {
            totalCost += order.payment.price;

            const userEmail = order.user.email;
            if (!ordersPerUser[userEmail]) {
                ordersPerUser[userEmail] = 0;
            }
            ordersPerUser[userEmail]++;

            for (const item of order.cart.items) {
                const product = item.product;
                const category = product.category.name

                if (!productsSold[product.title]) {
                    productsSold[product.title] = 0;
                }
                productsSold[product.title] += item.quantity;

                if (!categoriesSold[category]) {
                    categoriesSold[category] = 0;
                }
                categoriesSold[category] += item.quantity;
            }
        }

        const report = {
            totalCost,
            ordersPerUser,
            productsSold,
            categoriesSold,
        };

        res.status(200).json({message: 'success', data: report})
    } catch (err) {
        next(err)
    }
}

