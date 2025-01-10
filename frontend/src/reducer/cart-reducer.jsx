export function cartReducer(state, action) {
    switch (action.type) {
        case 'ADD_PRODUCT': {
            const { product } = action.payload;
            const existingProduct = state.items.find(item => item._id === product._id);

            if (existingProduct) {
                if (existingProduct.count < product.quantity) {
                    const updatedItems = state.items.map(item =>
                        item._id === product._id
                            ? { ...item, count: item.count + 1 }
                            : item
                    );

                    return {
                        ...state,
                        items: updatedItems,
                        totalPrice: state.totalPrice + product.price,
                    };
                } else {
                    return state;
                }
            } else {
                return {
                    ...state,
                    items: [...state.items, { ...product, count: 1 }],
                    totalPrice: state.totalPrice + product.price,
                };
            }
        }

        case 'ADD_PRODUCT_WITH_COUNT': {
            const { product, count } = action.payload;
            const existingProduct = state.items.find(item => item._id === product._id);

            if (existingProduct) {
                const newCount = existingProduct.count + count;

                if (newCount > product.quantity) {
                    return state;
                }

                return {
                    ...state,
                    items: state.items.map(item =>
                        item._id === product._id
                            ? { ...item, count: newCount }
                            : item
                    ),
                    totalPrice: state.totalPrice + product.price * count,
                };
            } else {
                return {
                    ...state,
                    items: [...state.items, { ...product, count }],
                    totalPrice: state.totalPrice + product.price * count,
                };
            }
        }

        case 'REMOVE_PRODUCT': {
            const updatedItems = state.items.filter(item => item._id !== action.payload.productId);
            const removedProduct = state.items.find(item => item._id === action.payload.productId);

            return {
                ...state,
                items: updatedItems,
                totalPrice: state.totalPrice - (removedProduct.price * removedProduct.count),
            };
        }

        case 'INCREMENT_COUNT': {
            const updatedItems = state.items.map(item =>
                item._id === action.payload.productId && item.count < item.quantity
                    ? { ...item, count: item.count + 1 }
                    : item
            );

            const incrementedProduct = state.items.find(item => item._id === action.payload.productId);
            const newTotalPrice = incrementedProduct
                ? state.totalPrice + incrementedProduct.price
                : state.totalPrice;

            return {
                ...state,
                items: updatedItems,
                totalPrice: newTotalPrice,
            };
        }

        case 'DECREMENT_COUNT': {
            const updatedItems = state.items
                .map(item =>
                    item._id === action.payload.productId
                        ? { ...item, count: item.count - 1 }
                        : item
                )
                .filter(item => item.count > 0);

            const decrementedProduct = state.items.find(item => item._id === action.payload.productId);
            const newTotalPrice = decrementedProduct
                ? state.totalPrice - decrementedProduct.price
                : state.totalPrice;

            return {
                ...state,
                items: updatedItems,
                totalPrice: newTotalPrice,
            };
        }

        default:
            return state;
    }
}
