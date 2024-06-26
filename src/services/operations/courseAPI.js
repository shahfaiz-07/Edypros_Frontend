import toast from "react-hot-toast"
import { apiConnector } from "../apiConnector"
import { courseEndpoints } from "../apis"

export const createCourse = async (formData, token) => {
    let result = null;
    const toastId = toast.loading("Creating...")
    try {
        const response = await apiConnector("POST", courseEndpoints.CREATE_COURSE_API, formData, {Authorization : `Bearer ${token}`});
        console.log("CREATE COURSE API RESPONSE ........", response);
        if (!response?.data?.success) {
            throw new Error("Could Not Add Course Details");
        }
        result = response?.data?.data;
        toast.success("Course Data Created !!")
    } catch (error) {
        console.log("CREATE COURSE API ERROR.......", error)
        toast.error("Unable to create course !!")
    }
    toast.dismiss(toastId)
    return result
}