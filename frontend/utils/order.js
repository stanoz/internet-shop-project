import axios from "axios";

export async function sendOrder({cart, userData, deliveryMethod, address, paymentMethod}) {
    const order = {
        user: {
            name: userData.name,
            surname: userData.surname,
            email: userData.email,
        },
        cart: {
            items: cart.items.map(item => ({
                id: item._id,
                quantity: item.count
            }))
        },
        delivery: {
            method: deliveryMethod,
        },
        address: {
            ...address,
            zip: address.zipCode,
        },
        payment: {
            method: paymentMethod
        }
    }
    console.log("order: ",order)
    return (await axios.post('http://localhost:3000/order/create-order', order)).data
}