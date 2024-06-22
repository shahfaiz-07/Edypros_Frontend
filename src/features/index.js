import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice"
import profileReducer from "./auth/profileSlice";
import cartReducer from "./cart/cartSlice";
const rootReducer = combineReducers({
    auth: authReducer,
    cart: cartReducer,
    profile: profileReducer
})

export default rootReducer;