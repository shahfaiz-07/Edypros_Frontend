import toast from "react-hot-toast";
import { apiConnector } from "../apiConnector"
import { categories } from "../apis"
import { setLoading } from "../../features/auth/profileSlice";

export const getAllCategorys = async () => {
    let result = []
    try {
        const response = await apiConnector("GET", categories.GET_CATEGORIES_API);
        console.log("GET CATEGORIES API RESPONSE...........",response)
        result = response.data.data
    } catch (error) {
        console.log("GET CATEGORIES API ERROR ......", error)
    }
    return result;
}

export const getCategoryPageDetails = async (dispatch, categoryId) => {
    dispatch(setLoading(true))
    const toastId = toast.loading("Loading...")
    let result = []
    try {
        const response = await apiConnector("GET", `${categories.GET_CATEGORY_PAGE_API}/${categoryId}`);

        console.log("CATEGORY PAGE API RESPONSE ......", response);

        if(!response?.data?.success) {
            throw new Error("Error while fetching category page details")
        }

        result = response?.data?.data;
        toast.success("Category Page Fetched Successfully")
    } catch (error) {
        console.log("CATEGORY PAGE API ERROR ......", error);
        toast.error("Cannot fetch page details")
    }
    dispatch(setLoading(false))
    toast.dismiss(toastId)
    return result
}