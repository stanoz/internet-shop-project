export const addProduct = (product) => ({
    type: 'ADD_PRODUCT',
    payload: { product },
});

export const removeProduct = (productId) => ({
    type: 'REMOVE_PRODUCT',
    payload: { productId },
});

export const incrementCount = (productId) => ({
    type: 'INCREMENT_COUNT',
    payload: { productId },
});

export const decrementCount = (productId) => ({
    type: 'DECREMENT_COUNT',
    payload: { productId },
});

export const addProductWithCount = (product, count) => ({
    type: 'ADD_PRODUCT_WITH_COUNT',
    payload: { product, count },
});
