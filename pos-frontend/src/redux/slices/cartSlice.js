import { createSlice } from "@reduxjs/toolkit";
import { updateCart } from "../../utils/cartUtils";



const initialState = localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : 
{cartItems : [] , totalPrice : 0};
const cartSlice = createSlice({
  name : "cart",
  initialState,
  reducers : {
    addToCart : (state , action) => {
      const item = action.payload;
  const existItem =  state.cartItems.find(x => x._id === item._id);
  if (existItem) {
  state.cartItems =  state.cartItems.map(x => x._id === item._id ? item : x)
  } else {
    state.cartItems = [...state.cartItems , item];
  }
    return updateCart(state);
  },
  removeFromCart : (state, action) => {
    state.cartItems = state.cartItems.filter(x => x._id !== action.payload);
    return updateCart(state);
  },
  updateItemQty : (state, action) => {
    // const item = state.cartItems.find(x => x._id === action.payload.id);
  // state.cartItems = state.cartItems.map(x => x._id === action.payload._id ? action.payload : x)
  state.cartItems = state.cartItems.map((item) =>
    item._id === action.payload.id
      ? { ...item, qty: action.payload.qty }
      : item
  )
    return updateCart(state);
  },
  clearCart : (state) => {
    state.cartItems =[];
    state.totalPrice = 0;
    localStorage.removeItem("cart");
  },
  },


})

export const {addToCart , removeFromCart , updateItemQty , clearCart} = cartSlice.actions;  
export default cartSlice.reducer;