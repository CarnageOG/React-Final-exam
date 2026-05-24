import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartProducts: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
        const item = state.cartProducts.find((product) => product.id === action.payload.id);
        if (item) {
            item.quantity += 1;
        }else {
            state.cartProducts.push({ ...action.payload, quantity: 1 });
        }
    },
    decreaseQuantity: (state, action) => {
        const item = state.cartProducts.find((product) => product.id === action.payload.id);
        if (item.quantity > 1) {
            item.quantity -= 1;
        } else {
            state.cartProducts = state.cartProducts.filter((product) => product.id !== action.payload.id);
        }
    },
    deleteFromCart: (state, action) => {    
        state.cartProducts = state.cartProducts.filter((product) => product.id !== action.payload.id);
    }
  }
});

export const { addToCart, decreaseQuantity, deleteFromCart } = cartSlice.actions;
export default cartSlice.reducer;