import toast from "react-hot-toast"
import { setLoading } from "../../features/auth/profileSlice"
import { setCompletedLectures, setTotalLectures, setCourseData, setRatingsAndReviews } from "../../features/registeredCourses/viewCourseSlice"
import { totalCourseLectures } from "../../utils/totalCourseLectures"
import { apiConnector } from "../apiConnector"
import { courseProgressEndpoints, ratingAndReviewEndpoints, studentEndpoints } from "../apis"

export const getCourseDetails = async (dispatch, courseId, token) => {
    dispatch(setLoading(true))
    let result = null;
    try {
        const response = await apiConnector("POST", studentEndpoints.GET_VIEW_COURSE_DETAILS_API, {courseId : courseId}, {Authorization : `Bearer ${token}`});

        console.log("VIEW COURSE API RESPONSE .......", response);

        if(!response?.data?.success) {
            throw new Error("Error while fetching course details");
        }

        toast.success("Course details fetched successfully !!")
        result = response?.data?.data;
    } catch (error) {
        console.log("VIEW COURSE DETAILS API ERROR .......", error)
        toast.error("Failed to fetch course details")
    }
    dispatch(setLoading(false))
    return result;
}

export const addRatingAndReview = async (dispatch, formData, token) => {
    const toastId = toast.loading("Adding...")
    try {
        const response = await apiConnector("POST", ratingAndReviewEndpoints.POST_COURSE_REVIEW_API, formData, { Authorization : `Bearer ${token}`})
        console.log("ADD COURSE REVIEW API RESPONSE .......", response);

        if(!response?.data?.success) {
            throw new Error("Error while adding course review");
        }

        dispatch(setRatingsAndReviews(response.data.data))
        toast.success("Review added successfully !!")
    } catch (error) {
        console.log("ADD COURSE REVIEW API ERROR ....", error);
        toast.error("Failed to add course review !!")
    }
    toast.dismiss(toastId)
}
export const editRatingAndReview = async (dispatch, formData, token) => {
    const toastId = toast.loading("Editing...")
    try {
        const response = await apiConnector("PATCH", ratingAndReviewEndpoints.POST_COURSE_REVIEW_API, formData, { Authorization : `Bearer ${token}`})
        console.log("EDIT COURSE REVIEW API RESPONSE .......", response);

        if(!response?.data?.success) {
            throw new Error("Error while adding course review");
        }

        dispatch(setRatingsAndReviews(response.data.data))
        toast.success("Review edited successfully !!")
    } catch (error) {
        console.log("EDIT COURSE REVIEW API ERROR ....", error);
        toast.error("Failed to edit course review !!")
    }
    toast.dismiss(toastId)
}

export const markAsComplete = async (dispatch, formData, token) => {
    const toastId = toast.loading("Updating...");
    try {
        const response = await apiConnector("POST", courseProgressEndpoints.SET_MARK_AS_COMPLETE, formData, {Authorization : `Bearer ${token}`})

        console.log("MARK COMPLETE API RESPONSE .......", response);

        if(!response?.data?.success) {
            throw new Error("Error while adding course review");
        }

        dispatch(setCompletedLectures(response.data.data.completedVideos))
        toast.success("Lecture Marked as Compelete !!")

    } catch (error) {
        console.log("MARK COMPLETE API ERROR ", error);
        toast.error("Cannot Mark Lecture As Complete !!")
    }
    toast.dismiss(toastId)
}