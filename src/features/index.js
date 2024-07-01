import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice"
import profileReducer from "./auth/profileSlice";
import courseReducer from "./courses/courseSlice"
import wishlistReducer from "./wishlist/wishlistSlice"
const rootReducer = combineReducers({
    auth: authReducer,
    profile: profileReducer,
    course: courseReducer,
    wishlist: wishlistReducer
})

export default rootReducer;