const Product = require("../models/product");

async function calculateOrderPrice(items, discount = undefined, promotion = undefined) {
    const productIds = items.map(item => item.product)
    const productsFromDb = await Product.find({_id: {$in: productIds}}).populate('category', 'name').lean()


    const itemsWithPrices = items.map(item => {
        const product = productsFromDb.find(p => p._id.toString() === item.product)
        if (!product) {
            throw new Error(`Product with id ${item.product} not found`)
        }
        let productPrice = product.price
        if (promotion && promotion.scope === product.category.name) {
            productPrice *= (1 - promotion.percentageDiscount) / 100
        }
        return {
            ...item,
            price: productPrice,
        }
    })

    let totalPrice = itemsWithPrices.reduce((sum, item) => {
        return sum + item.price * item.quantity;
    }, 0)

    if (discount) {
        totalPrice -= discount.value
    }

    return totalPrice
}

module.exports = {calculateOrderPrice}