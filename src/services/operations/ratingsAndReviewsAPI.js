import toast from "react-hot-toast";
import { apiConnector } from "../apiConnector"
import { ratingAndReviewEndpoints } from "../apis"

export const getTopRatings = async () => {
    let result = []
    try {
        const response = await apiConnector("GET", ratingAndReviewEndpoints.GET_TOP_RATINGS_API);

        // console.log("GET TOP RATINGS API RESPONSE .......", response);

        if(!response.data?.success) {
            throw new Error("Error Fetching Top Review")
        }

        result = response?.data?.data;

    } catch (error) {
        // console.log("GET TOP RATINGS API ERROR .........", error);
        toast.error(error.message)
    }
    return result
}

export const getCourseRatings = async (courseId) => {
    let result = []
    try {
        const response = await apiConnector("GET", `${ratingAndReviewEndpoints.GET_COURSE_RATINGS_API}/${courseId}`);

        // console.log("GET COURSE RATINGS API RESPONSE .......", response);

        if(!response.data?.success) {
            throw new Error("Error Fetching Top Review")
        }

        result = response?.data?.data;

    } catch (error) {
        // console.log("GET COURSE RATINGS API ERROR .........", error);
        toast.error(error.message)
    }
    return result
}