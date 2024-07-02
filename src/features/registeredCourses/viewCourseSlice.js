import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    totalLectures : 0,
    completedLectures : [],
    courseData : null,
    currentSection : null,
    currentVideo : null,
    ratingAndReview : null,
    duration: "0s"
}
const viewCourseSlice = createSlice( {
    name: "viewCourse",
    initialState,
    reducers : {
        setCourseData: (state, action) => {
            state.courseData = action.payload
        },
        setTotalLectures : (state, action) => {
            state.totalLectures = action.payload
        },
        setCompletedLectures : (state, action) => {
            state.completedLectures = action.payload
        },
        updateCompletedLectures : (state, action) => {
            state.completedLectures = [...state.completedLectures, action.payload]
        },
        setCurrentSection: (state, action) => {
            state.currentSection = action.payload
        },
        setCurrentVideo: (state, action) => {
            state.currentVideo = action.payload
        },
        setRatingsAndReviews: (state, action) => {
            state.ratingAndReview = action.payload
        },
        setDuration: (state, action) => {
            state.duration = action.payload
        },
        resetViewCourse: (state, action) => {
            state.totalLectures = 0;
            state.completedLectures = [];
            state.courseData = null;
            state.currentSection = null;
            state.currentVideo = null;
            state.ratingAndReview = null;
            state.duration= "0s";
        }
    }
});

export const {setCompletedLectures, setCourseData, setTotalLectures, updateCompletedLectures, setCurrentSection, setCurrentVideo, setRatingsAndReviews, setDuration, resetViewCourse} = viewCourseSlice.actions;
export default viewCourseSlice.reducer;