import toast from "react-hot-toast"
import { apiConnector } from "../apiConnector"
import { courseEndpoints, sectionEndpoints, videoEndpoints } from "../apis"
import { setCourse } from "../../features/courses/courseSlice";

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

export const createSection = async (dispatch, sectionName, courseId, token) => {
    const toastId = toast.loading("Creating...");
    // const sectionId = 
    try {
        const response = await apiConnector("POST", sectionEndpoints.SECTION_API, {sectionName, courseId}, {Authorization : `Bearer ${token}`});
        console.log("SECTION CREATE API RESPONSE.......", response);

        if (!response?.data?.success) {
            throw new Error("Could Not Create Section");
        }
    
        dispatch(setCourse(response.data.data))
        toast.success("Section Created Successfully")
    } catch (error) {
        console.log("SECTION CREATE API ERROR..........", error);
        toast.error("Error while creating section !!")
    }
    toast.dismiss(toastId)
}

export const editSection = async (dispatch, sectionName, sectionId, token) => {
    const toastId = toast.loading("Updating...");
    let result = []
    try {
        const response = await apiConnector("PATCH", sectionEndpoints.SECTION_API, {sectionName, sectionId}, {Authorization : `Bearer : ${token}`})
        console.log("SECTION UPDATE API RESPONSE.......", response);

        if (!response?.data?.success) {
            throw new Error("Could Not Update Section");
        }
        dispatch(setCourse(response.data.data))
        toast.success("Section Updated Successfully")
        result =  response.data.data;
    } catch (error) {
        console.log("SECTION UPDATE API ERROR..........", error);
        toast.error("Error while updating section !!")
    }
    toast.dismiss(toastId)
    return result
}

export const deleteSection = async (dispatch, sectionId, token) => {
    const toastId = toast.loading("Deleting...")
    try {
        const response = await apiConnector("DELETE", `${sectionEndpoints.SECTION_API}/${sectionId}`, null, {Authorization : `Bearer : ${token}`})

        console.log("SECTION DELETE API RESPONSE.......", response);

        if (!response?.data?.success) {
            throw new Error("Could Not Delete Section");
        }
    
        dispatch(setCourse(response.data.data))
        toast.success("Section Deleted Successfully")
    } catch (error) {
        console.log("SECTION DELETE API ERROR..........", error);
        toast.error("Error while deleting section !!")
    }
    toast.dismiss(toastId)
}

export const createVideo = async (dispatch, formData, token) => {
    const toastId = toast.loading("Uploading...")
    try {
        const response = await apiConnector("POST", videoEndpoints.CREATE_VIDEO_API, formData, {Authorization : `Bearer ${token}`});

        console.log("LECTURE CREATE API RESPONSE.......", response);

        if (!response?.data?.success) {
            throw new Error("Could Not Create Lecture");
        }
    
        dispatch(setCourse(response.data.data))
        toast.success("Lecture created Successfully")
    } catch (error) {
        console.log("VIDEO CREATE API ERROR..........", error);
        toast.error("Error while creating lecture !!")
    }
    toast.dismiss(toastId)
}

export const updateVideoDetails = async (dispatch, formData, videoId, token) => {
    const toastId = toast.loading("Updating...")
    try {
        const response = await apiConnector("PATCH", `${videoEndpoints.UPDATE_VIDEO_API}/${videoId}`, formData, {Authorization : `Bearer ${token}`});

        console.log("LECTURE UPDATE API RESPONSE.......", response);

        if (!response?.data?.success) {
            throw new Error("Could Not Update Lecture");
        }
    
        dispatch(setCourse(response.data.data))
        toast.success("Lecture updated Successfully")
    } catch (error) {
        console.log("VIDEO DETAILS UPDATE API ERROR..........", error);
        toast.error("Error while editing lecture !!")
    }
    toast.dismiss(toastId)
}

export const updateVideoFile = async (dispatch, formData, token) => {
    const toastId = toast.loading("Updating Video File...")
    try {
        const response = await apiConnector("PATCH", videoEndpoints.UPDATE_VIDEO_URL_API, formData, {Authorization : `Bearer ${token}`});

        console.log("LECTURE VIDEO FILE UPDATE API RESPONSE.......", response);

        if (!response?.data?.success) {
            throw new Error("Could Not Update Lecture");
        }
    
        dispatch(setCourse(response.data.data))
        toast.success("Lecture file updated Successfully")
    } catch (error) {
        console.log("VIDEO FILE UPDATE API ERROR..........", error);
        toast.error("Error while updating video file !!")
    }
    toast.dismiss(toastId)
}

export const deleteVideo = async(dispatch, videoId, token) => {
    const toastId = toast.loading("Deleting...");
    try {
        const response = await apiConnector("DELETE", `${videoEndpoints.DELETE_VIDEO_API}/${videoId}`, null, {Authorization : `Bearer ${token}`})

        console.log("LECTURE DELETE API RESPONSE.......", response);

        if (!response?.data?.success) {
            throw new Error("Could Not Update Lecture");
        }
    
        dispatch(setCourse(response.data.data))
        toast.success("Lecture file deleted Successfully")
    } catch (error) {
        console.log("VIDEO DELETE API ERROR..........", error);
        toast.error("Error while deleting lecture !!")
    }
    toast.dismiss(toastId);
}