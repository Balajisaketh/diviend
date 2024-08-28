// src/reducers/cartSlice.js
import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    user: [],
    // You can add more initial state properties here if needed
  },
  reducers: {
    addTouser: (state, action) => {
        console.log("i am here",action.payload)
      // Use the spread operator to add the new item to the user array
      state.user.push(action.payload); // Correctly mutating the state
    },
    removeUser:(state,action)=>{
        state.user = state.user.filter((val) => val.givenName !== action.payload);
        
    }
  },
});

// Export the actions to be used in components
export const { 
    addTouser, 
    removeUser

} = cartSlice.actions;

// Export the reducer
export default cartSlice.reducer;

