import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const newItem = action.payload;
      // if state.items already has the item, increment its quantity
      if (state.items.some((item) => item.id === newItem.id)) {
        state.items = state.items.map((item) =>
          item.id === newItem.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        // add the item to state, initialize its quantity
        state.items = [...state.items, { ...newItem, quantity: 1 }];
      }
    },
    removeFromCart: (state, action) => {
      const id = action.payload;
      // if state.items has duplicates of the sought item, decrement its quantity
      if (state.items.some((item) => item.id === id && item.quantity > 1)) {
        state.items = state.items.map((item) =>
          item.id === id && item.quantity > 1
            ? { ...item, quantity: item.quantity - 1 }
            : item
        );
      } else {
        // remove the item from state
        state.items = state.items.filter((item) => item.id !== id);
      }
    },
  },
});

export const { addToCart, removeFromCart } = cartSlice.actions;

export const cartItems = (state) => state.cart.items;

export const quantityItems = (state) =>
  state.cart.items.reduce((sum, item) => sum + item.quantity, 0);

export const itemsTotal = (state) =>
  Math.ceil(
    state.cart.items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    ) * 100
  ) / 100;

export default cartSlice.reducer;
