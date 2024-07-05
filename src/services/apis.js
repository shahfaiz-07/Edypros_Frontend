const BASE_URL = import.meta.env.VITE_API_BASE_URL

// AUTH ENDPOINTS
export const endpoints = {
	SENDOTP_API: BASE_URL +  "/api/v1/users/send-otp",
	REGISTER_API: BASE_URL + "/api/v1/users/register",
	LOGIN_API: BASE_URL + "/api/v1/users/login",
	RESETPASSTOKEN_API: BASE_URL + "/api/v1/users/reset-password-token",
	RESETPASSWORD_API: BASE_URL + "/api/v1/users/reset-password",
	LOGOUT_API: BASE_URL + "/api/v1/users/logout",
};

// CONTACT-US API
export const contactusEndpoint = {
	CONTACT_US_API: BASE_URL + "/api/v1/users/contact-us",
};

export const categories = {
	GET_CATEGORIES_API: BASE_URL + "/api/v1/category",
	GET_CATEGORY_PAGE_API: BASE_URL + "/api/v1/category"
};

// SETTINGS PAGE API
export const settingsEndpoints = {
	UPDATE_DISPLAY_PICTURE_API: BASE_URL + "/api/v1/users/change-avatar",
	UPDATE_PROFILE_API: BASE_URL + "/api/v1/profile/update-profile",
	CHANGE_PASSWORD_API: BASE_URL + "/api/v1/users/change-password",
	DELETE_PROFILE_API: BASE_URL + "/api/v1/users/delete",
	UPGRADE_TO_INSTRUCTOR_API: BASE_URL + "/api/v1/profile/upgrade-account",
};

export const profileEndpoints = {
	GET_USER_DETAILS_API: BASE_URL + "/api/v1/users/current-user",
	GET_USER_REGISTERED_COURSES_API: BASE_URL + "/api/v1/users/registered-courses",
	USER_WISHLIST: BASE_URL + "/api/v1/profile/wishlist",
	INSTRUCTOR_DASHBOARD_API : BASE_URL + "/api/v1/profile/instructor-dashboard"
};

export const courseEndpoints = {
	CREATE_COURSE_API: BASE_URL + "/api/v1/courses",
	CHANGE_COURSE_STATUS_API: BASE_URL + "/api/v1/courses/status",
	GET_INSTRUCTOR_COURSES_API: BASE_URL + "/api/v1/courses/instructor/my-courses",
	GET_UPDATE_DELETE_COURSE_API: BASE_URL + "/api/v1/courses/c",
	GET_COURSE_PREVIEW_API: BASE_URL + "/api/v1/courses/preview",
	UPDATE_COURSE_THUMBNAIL_API: BASE_URL + "/api/v1/courses/thumbnail"
}

export const sectionEndpoints = {
	SECTION_API: BASE_URL + "/api/v1/section"
}

export const videoEndpoints = {
	CREATE_VIDEO_API : BASE_URL + "/api/v1/video/upload",
	UPDATE_VIDEO_API : BASE_URL + "/api/v1/video/update",
	UPDATE_VIDEO_URL_API : BASE_URL + "/api/v1/video/update-url",
	DELETE_VIDEO_API : BASE_URL + "/api/v1/video/delete"
}

export const paymentEndpoints = {
	CAPTURE_PAYMENT_API : BASE_URL + "/api/v1/payments/capture-payment",
	VERIFY_SIGNATURE_API : BASE_URL + "/api/v1/payments/verify-signature",
	SEND_PAYMENT_SUCCESSFULL_EMAIL_API: BASE_URL + "/api/v1/payments/send-confirmation-email"
}

export const studentEndpoints = {
	GET_VIEW_COURSE_DETAILS_API : BASE_URL + "/api/v1/courses/view-course"
}

export const ratingAndReviewEndpoints = {
	POST_COURSE_REVIEW_API : BASE_URL + "/api/v1/ratings-and-reviews",
	GET_TOP_RATINGS_API : BASE_URL + "/api/v1/ratings-and-reviews/top-ratings",
	GET_COURSE_RATINGS_API: BASE_URL + "/api/v1/ratings-and-reviews/c"
}

export const courseProgressEndpoints = {
	SET_MARK_AS_COMPLETE : BASE_URL + "/api/v1/course-progress"
}
