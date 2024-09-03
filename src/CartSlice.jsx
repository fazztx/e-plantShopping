import { createSlice } from '@reduxjs/toolkit';

export const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [], // Initialize items as an empty array
    totalQuantity: 0,
  },
  reducers: {
    addItem: (state, action) => {
      const { name, image, cost } = action.payload; //Extracts necessary information from item passed to addItem
      const existingItem = state.items.find(item => item.name === name);
      if (existingItem) {
        existingItem.quantity++;
      } else {
        state.items.push({ name, image, cost, quantity: 1 });
      }
      state.totalQuantity = state.totalQuantity + 1; //Add item will always add exactly 1 new item or add another one of the same


    },
    removeItem: (state, action) => {
      //Returns the elements of the array where item.name doesn't match action payload name
      state.items = state.items.filter(item => item.name !== action.payload.name);
      state.totalQuantity = state.totalQuantity - action.payload.quantity; //Remove will depend on the quantity of selecteditem
      //console.log(state.totalQuantity);

    },
    updateQuantity: (state, action) => {
      //console.log(state.totalQuantity);

      const { name, quantity } = action.payload;
      const itemToUpdate = state.items.find(item => item.name === name);
      if (itemToUpdate) {
        (itemToUpdate.quantity < quantity ? //Either plus 1 or minus 1
          state.totalQuantity = state.totalQuantity + 1 : state.totalQuantity = state.totalQuantity - 1);
        itemToUpdate.quantity = quantity;
      }
      //console.log(state.totalQuantity);

    },
  },
});

export const { addItem, removeItem, updateQuantity } = CartSlice.actions;

export default CartSlice.reducer;
