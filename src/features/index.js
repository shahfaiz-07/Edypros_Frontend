import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice"
import profileReducer from "./auth/profileSlice";
import courseReducer from "./courses/courseSlice"
import wishlistReducer from "./wishlist/wishlistSlice"
import viewCourseReducer from "./registeredCourses/viewCourseSlice";
const rootReducer = combineReducers({
    auth: authReducer,
    profile: profileReducer,
    course: courseReducer,
    wishlist: wishlistReducer,
    viewCourse: viewCourseReducer
})

export default rootReducer;