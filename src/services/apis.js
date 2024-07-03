// AUTH ENDPOINTS
export const endpoints = {
	SENDOTP_API: "/api/v1/users/send-otp",
	REGISTER_API: "/api/v1/users/register",
	LOGIN_API: "/api/v1/users/login",
	RESETPASSTOKEN_API: "/api/v1/users/reset-password-token",
	RESETPASSWORD_API: "/api/v1/users/reset-password",
	LOGOUT_API: "/api/v1/users/logout",
};

// CONTACT-US API
export const contactusEndpoint = {
	CONTACT_US_API: "/api/v1/users/contact-us",
};

export const categories = {
	GET_CATEGORIES_API: "/api/v1/category",
	GET_CATEGORY_PAGE_API: "/api/v1/category"
};

// SETTINGS PAGE API
export const settingsEndpoints = {
	UPDATE_DISPLAY_PICTURE_API: "/api/v1/users/change-avatar",
	UPDATE_PROFILE_API: "/api/v1/profile/update-profile",
	CHANGE_PASSWORD_API: "/api/v1/users/change-password",
	DELETE_PROFILE_API: "/api/v1/users/delete",
	UPGRADE_TO_INSTRUCTOR_API: "/api/v1/profile/upgrade-account",
};

export const profileEndpoints = {
	GET_USER_DETAILS_API: "/api/v1/users/current-user",
	GET_USER_REGISTERED_COURSES_API: "/api/v1/users/registered-courses",
	USER_WISHLIST: "/api/v1/profile/wishlist",
	INSTRUCTOR_DASHBOARD_API : "/api/v1/profile/instructor-dashboard"
};

export const courseEndpoints = {
	CREATE_COURSE_API: "/api/v1/courses",
	CHANGE_COURSE_STATUS_API: "/api/v1/courses/status",
	GET_INSTRUCTOR_COURSES_API: "/api/v1/courses/instructor/my-courses",
	GET_UPDATE_DELETE_COURSE_API: "/api/v1/courses/c",
	GET_COURSE_PREVIEW_API: "/api/v1/courses/preview",
	UPDATE_COURSE_THUMBNAIL_API: "/api/v1/courses/thumbnail"
}

export const sectionEndpoints = {
	SECTION_API: "/api/v1/section"
}

export const videoEndpoints = {
	CREATE_VIDEO_API : "/api/v1/video/upload",
	UPDATE_VIDEO_API : "/api/v1/video/update",
	UPDATE_VIDEO_URL_API : "/api/v1/video/update-url",
	DELETE_VIDEO_API : "/api/v1/video/delete"
}

export const paymentEndpoints = {
	CAPTURE_PAYMENT_API : "/api/v1/payments/capture-payment",
	VERIFY_SIGNATURE_API : "/api/v1/payments/verify-signature",
	SEND_PAYMENT_SUCCESSFULL_EMAIL_API: "/api/v1/payments/send-confirmation-email"
}

export const studentEndpoints = {
	GET_VIEW_COURSE_DETAILS_API : "/api/v1/courses/view-course"
}

export const ratingAndReviewEndpoints = {
	POST_COURSE_REVIEW_API : "/api/v1/ratings-and-reviews",
	GET_TOP_RATINGS_API : "/api/v1/ratings-and-reviews/top-ratings",
	GET_COURSE_RATINGS_API: "/api/v1/ratings-and-reviews/c"
}

export const courseProgressEndpoints = {
	SET_MARK_AS_COMPLETE : "/api/v1/course-progress"
}
