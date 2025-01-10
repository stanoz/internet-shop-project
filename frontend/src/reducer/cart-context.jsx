import React, { createContext, useReducer, useContext } from 'react';
import { cartReducer } from './cart-reducer.jsx';

const CartContext = createContext();

const initialState = {
    items: [],
    totalPrice: 0,
};

export const CartProvider = ({ children }) => {
    const [state, dispatch] = useReducer(cartReducer, initialState);

    return (
        <CartContext.Provider value={{ state, dispatch }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);
