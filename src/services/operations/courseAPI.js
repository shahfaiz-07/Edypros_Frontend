import toast from "react-hot-toast"
import { apiConnector } from "../apiConnector"
import { courseEndpoints, sectionEndpoints, videoEndpoints } from "../apis"
import { setCourse, setStep } from "../../features/courses/courseSlice";
import { setLoading } from "../../features/auth/profileSlice";

export const createCourse = async (formData, token) => {
    let result = null;
    const toastId = toast.loading("Creating...")
    try {
        const response = await apiConnector("POST", courseEndpoints.CREATE_COURSE_API, formData, {Authorization : `Bearer ${token}`});
        // console.log("CREATE COURSE API RESPONSE ........", response);
        if (!response?.data?.success) {
            throw new Error("Could Not Add Course Details");
        }
        result = response?.data?.data;
        toast.success("Course Data Created !!")
    } catch (error) {
        // console.log("CREATE COURSE API ERROR.......", error)
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
        // console.log("SECTION CREATE API RESPONSE.......", response);

        if (!response?.data?.success) {
            throw new Error("Could Not Create Section");
        }
    
        dispatch(setCourse(response.data.data))
        toast.success("Section Created Successfully")
    } catch (error) {
        // console.log("SECTION CREATE API ERROR..........", error);
        toast.error("Error while creating section !!")
    }
    toast.dismiss(toastId)
}

export const editSection = async (dispatch, sectionName, sectionId, token) => {
    const toastId = toast.loading("Updating...");
    let result = []
    try {
        const response = await apiConnector("PATCH", sectionEndpoints.SECTION_API, {sectionName, sectionId}, {Authorization : `Bearer : ${token}`})
        // console.log("SECTION UPDATE API RESPONSE.......", response);

        if (!response?.data?.success) {
            throw new Error("Could Not Update Section");
        }
        dispatch(setCourse(response.data.data))
        toast.success("Section Updated Successfully")
        result =  response.data.data;
    } catch (error) {
        // console.log("SECTION UPDATE API ERROR..........", error);
        toast.error("Error while updating section !!")
    }
    toast.dismiss(toastId)
    return result
}

export const deleteSection = async (dispatch, sectionId, token) => {
    const toastId = toast.loading("Deleting...")
    try {
        const response = await apiConnector("DELETE", `${sectionEndpoints.SECTION_API}/${sectionId}`, null, {Authorization : `Bearer : ${token}`})

        // console.log("SECTION DELETE API RESPONSE.......", response);

        if (!response?.data?.success) {
            throw new Error("Could Not Delete Section");
        }
    
        dispatch(setCourse(response.data.data))
        toast.success("Section Deleted Successfully")
    } catch (error) {
        // console.log("SECTION DELETE API ERROR..........", error);
        toast.error("Error while deleting section !!")
    }
    toast.dismiss(toastId)
}

export const createVideo = async (dispatch, formData, token) => {
    const toastId = toast.loading("Uploading...")
    try {
        const response = await apiConnector("POST", videoEndpoints.CREATE_VIDEO_API, formData, {Authorization : `Bearer ${token}`});

        // console.log("LECTURE CREATE API RESPONSE.......", response);

        if (!response?.data?.success) {
            throw new Error("Could Not Create Lecture");
        }
    
        dispatch(setCourse(response.data.data))
        toast.success("Lecture created Successfully")
    } catch (error) {
        // console.log("VIDEO CREATE API ERROR..........", error);
        toast.error("Error while creating lecture !!")
    }
    toast.dismiss(toastId)
}

export const updateVideoDetails = async (dispatch, formData, videoId, token) => {
    const toastId = toast.loading("Updating...")
    try {
        const response = await apiConnector("PATCH", `${videoEndpoints.UPDATE_VIDEO_API}/${videoId}`, formData, {Authorization : `Bearer ${token}`});

        // console.log("LECTURE UPDATE API RESPONSE.......", response);

        if (!response?.data?.success) {
            throw new Error("Could Not Update Lecture");
        }
    
        dispatch(setCourse(response.data.data))
        toast.success("Lecture updated Successfully")
    } catch (error) {
        // console.log("VIDEO DETAILS UPDATE API ERROR..........", error);
        toast.error("Error while editing lecture !!")
    }
    toast.dismiss(toastId)
}

export const updateVideoFile = async (dispatch, formData, token) => {
    const toastId = toast.loading("Updating Video File...")
    try {
        const response = await apiConnector("PATCH", videoEndpoints.UPDATE_VIDEO_URL_API, formData, {Authorization : `Bearer ${token}`});

        // console.log("LECTURE VIDEO FILE UPDATE API RESPONSE.......", response);

        if (!response?.data?.success) {
            throw new Error("Could Not Update Lecture");
        }
    
        dispatch(setCourse(response.data.data))
        toast.success("Lecture file updated Successfully")
    } catch (error) {
        // console.log("VIDEO FILE UPDATE API ERROR..........", error);
        toast.error("Error while updating video file !!")
    }
    toast.dismiss(toastId)
}

export const deleteVideo = async(dispatch, videoId, token) => {
    const toastId = toast.loading("Deleting...");
    try {
        const response = await apiConnector("DELETE", `${videoEndpoints.DELETE_VIDEO_API}/${videoId}`, null, {Authorization : `Bearer ${token}`})

        // console.log("LECTURE DELETE API RESPONSE.......", response);

        if (!response?.data?.success) {
            throw new Error("Could Not Update Lecture");
        }
    
        dispatch(setCourse(response.data.data))
        toast.success("Lecture file deleted Successfully")
    } catch (error) {
        // console.log("VIDEO DELETE API ERROR..........", error);
        toast.error("Error while deleting lecture !!")
    }
    toast.dismiss(toastId);
}

export const changeCourseStatus = async(dispatch, formData, token, navigate) => {
    const toastId = toast.loading("Updating...")
    try {
        const response = await apiConnector("PATCH", `${courseEndpoints.CHANGE_COURSE_STATUS_API}`, formData, {Authorization : `Bearer ${token}`})

        // console.log("COURSE STATUS UPDATE API RESPONSE.......", response);

        if (!response?.data?.success) {
            throw new Error("Could Not Update Course Status");
        }
    
        dispatch(setCourse(response.data.data))
        toast.success("Course status updated Successfully")
        navigate("/dashboard/my-courses")
    } catch (error) {
        // console.log("CHANGE COURSE STATUS API ERROR..........", error);
        toast.error("Error while updating course status !!")
    }
    toast.dismiss(toastId)
}

export const getInstructorCourses = async(dispatch, token) => {
    dispatch(setLoading(true))
    let result = []
    try {
        const response = await apiConnector("GET", courseEndpoints.GET_INSTRUCTOR_COURSES_API, null, {Authorization: `Bearer ${token}`})

        // console.log("GET INSTRUCTOR COURSES API RESPONSE.......", response);

        if (!response?.data?.success) {
            throw new Error("Could Not Get Instructor Courses");
        }

        result = response.data?.data;
        toast.success("My Courses fetched successfully !!")
    } catch (error) {
        // console.log("GET INSTRUCTOR COURSES API ERROR..........", error);
        toast.error("Error while fetching My Courses !!")
    }
    dispatch(setLoading(false))
    return result;
}

export const deleteCourse = async (courseId ,token) => {
    const toastId = toast.loading("Deleting...")
    try {
       const response = await apiConnector("DELETE", `${courseEndpoints.GET_UPDATE_DELETE_COURSE_API}/${courseId}`, null, {Authorization : `Bearer ${token}`});
       
    //    console.log("COURSE DELETE API RESPONSE.......", response);

        if (!response?.data?.success) {
            throw new Error("Could Not Get Instructor Courses");
        }

        toast.success("Course deleted successfully !!")
        location.reload()
    } catch (error) {
        // console.log("COURSE DELETE API ERROR..........", error);
        toast.error("Error while deleting course !!")
    }
    toast.dismiss(toastId)
}

export const getEditableCourseData = async (dispatch, courseId, token) => {
    dispatch(setLoading(true));
    try {
        const response = await apiConnector("GET", `${courseEndpoints.GET_UPDATE_DELETE_COURSE_API}/${courseId}`, null, {Authorization : `Bearer ${token}`})

        // console.log("GET COURSE API RESPONSE.......", response);

        if (!response?.data?.success) {
            throw new Error("Cannot fetch editable course data");
        }
        dispatch(setCourse(response.data.data))
        // toast.success("Course data fetch successfully !!")
    } catch (error) {
        // console.log("GET COURSE API ERROR..........", error);
        toast.error("Error while fetching course data !!")
    }
    dispatch(setLoading(false));
}

export const updateCourseData = async (dispatch, formData, courseId, token) => {
    dispatch(setLoading(true))
    try {
        const response = await apiConnector("PATCH", `${courseEndpoints.GET_UPDATE_DELETE_COURSE_API}/${courseId}`, formData, {authorization : `Bearer ${token}`});

        // console.log("UPDATE COURSE API RESPONSE.......", response);

        if (!response?.data?.success) {
            throw new Error("Cannot update course data");
        }

        dispatch(setCourse(response?.data?.data))
        
        toast.success("Changes Saved Successfully !!")
    } catch (error) {
        // console.log("COURSE UPDATE API ERROR ........", error);
        toast.error("Error updating course data !!")
    }
    dispatch(setLoading(false))
}

export const updateCourseThumbnail = async (dispatch, formData, courseId, token) => {
    dispatch(setLoading(true))
    try {
        const response = await apiConnector("PATCH", `${courseEndpoints.UPDATE_COURSE_THUMBNAIL_API}/${courseId}`, formData, {authorization : `Bearer ${token}`});

        // console.log("UPDATE COURSE THUMBNAIL API RESPONSE.......", response);

        if (!response?.data?.success) {
            throw new Error("Cannot update course thumbnail");
        }

        dispatch(setCourse(response?.data?.data))
        
        toast.success("Thumbnail Changed Successfully !!")
    } catch (error) {
        // console.log("THUMBNAIL UPDATE API ERROR ........", error);
        toast.error("Error updating course thumbnail !!")
    }
    dispatch(setLoading(false))
}

export const getCoursePreview = async(dispatch, courseId) => {
    dispatch(setLoading(true))
    // const toastId = toast.loading("Loading...")
    let result = []
    try {
        const response = await apiConnector("GET", `${courseEndpoints.GET_COURSE_PREVIEW_API}/${courseId}`);

        // console.log("COURSE PREVIEW API RESPONSE.......", response);

        if (!response?.data?.success) {
            throw new Error("Cannot update course data");
        }
        result = response?.data?.data
        // toast.success("Course Preview Fetched")
    } catch (error) {
        // console.log("COURSE PREVIEW API ERROR........", error)
        toast.error("Error while fetching course preview")
    }
    // toast.dismiss(toastId)
    dispatch(setLoading(false))
    return result
}