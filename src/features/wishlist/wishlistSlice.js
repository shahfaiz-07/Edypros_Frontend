import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    totalItems : 0
}
const wishlistSlice = createSlice({
    name: "wishlist",
    initialState,
    reducers : {
        setTotalItems: (state, action) => {
            state.totalItems = action.payload
        }
    }
})

export const { setTotalItems } = wishlistSlice.actions;

export default wishlistSlice.reducer