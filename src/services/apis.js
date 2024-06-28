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
	GET_USER_DETAILS_API: "/profile/getUserDetails",
	GET_USER_REGISTERED_COURSES_API: "/api/v1/users/registered-courses",
	GET_ALL_INSTRUCTOR_DASHBOARD_DETAILS_API:
		"/profile/getInstructorDashboardDetails",
	USER_WISHLIST: "/api/v1/profile/wishlist",
};

export const courseEndpoints = {
	CREATE_COURSE_API: "/api/v1/courses",
	CHANGE_COURSE_STATUS_API: "/api/v1/courses/status",
	GET_INSTRUCTOR_COURSES_API: "/api/v1/courses/instructor/my-courses",
	GET_UPDATE_DELETE_COURSE_API: "/api/v1/courses/c"
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
