import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice"
import profileReducer from "./auth/profileSlice";
import courseReducer from "./courses/courseSlice"
const rootReducer = combineReducers({
    auth: authReducer,
    profile: profileReducer,
    course: courseReducer
})

export default rootReducer;