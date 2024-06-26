import toast from "react-hot-toast";
import { profileEndpoints, settingsEndpoints } from "../apis";
import { apiConnector } from "../apiConnector";
import { setLoading, setUser } from "../../features/auth/profileSlice";
import { logout } from "./authAPI";
import { setToken } from "../../features/auth/authSlice";

export async function updateAvatar(token, avatar) {
	const toastId = toast.loading("Uploading...");
	try {
		const formData = new FormData();
		console.log("avatar", avatar);
		formData.append("avatar", avatar);
		const response = await apiConnector(
			"PATCH",
			settingsEndpoints.UPDATE_DISPLAY_PICTURE_API,
			formData,
			{
				Authorisation: `Bearer ${token}`,
			}
		);
		console.log(
			"UPDATE_DISPLAY_PICTURE_API API RESPONSE............",
			response.data.data
		);
		if (!response.data.success) {
			throw new Error(response.data.message);
		}
		toast.success("Profile Picture Updated Successfully");
		const newAvatar = response.data.data.avatar;
		localStorage.setItem(
			"user",
			JSON.stringify({
				...JSON.parse(localStorage.getItem("user")),
				avatar: newAvatar,
			})
		);
		console.log(JSON.parse(localStorage.getItem("user")).avatar);
		location.reload();
	} catch (error) {
		console.log("UPDATE_DISPLAY_PICTURE_API API ERROR............", error);
		toast.error(error.response.data.message);
	}
	toast.dismiss(toastId);
}
export async function updateProfile(token, formData) {
	const toastId = toast.loading("Updating...");
	try {
		const response = await apiConnector(
			"PATCH",
			settingsEndpoints.UPDATE_PROFILE_API,
			formData,
			{
				Authorisation: `Bearer ${token}`,
			},
			null
		);
		console.log(
			"UPDATE PROFILE API RESPONSE ..............",
			response.data.data
		);
		if (!response.data.success) {
			throw new Error(response.data.message);
		}
		toast.success("Profile Data Updated Successfully");
		console.log(response.data.data);
		localStorage.setItem("user", JSON.stringify(response.data.data));
		location.reload();
	} catch (error) {
		console.log("UPDATE PROFILE API ERROR .............", error);
		toast.error(error.response.data.message);
	}
	toast.dismiss(toastId);
}

export async function updatePassword(token, password) {
	const toastId = toast.loading("Changing Password...");
	try {
		const response = await apiConnector(
			"PATCH",
			settingsEndpoints.CHANGE_PASSWORD_API,
			password,
			{ Authorisation: `Bearer ${token}` },
			null
		);

		console.log("CHANGE PASSWORD API RESPONSE ..............", response);
		if (!response.data.success) {
			throw new Error(response.data.message);
		}
		toast.success("Password Updated Successfully !!");
	} catch (error) {
		console.log("CHANGE PASSWORD API ERROR ..............", error);
	}
	toast.dismiss(toastId);
}

export function deleteAccount(token, navigate) {
	return async (dispatch) => {
		dispatch(setLoading(true));
		try {
			const response = await apiConnector(
				"DELETE",
				settingsEndpoints.DELETE_PROFILE_API,
				null,
				{
					Authorisation: `Bearer ${token}`,
				}
			);

			console.log("ACCOUNT DELETION API RESPONSE ............", response);
			if (!response.data.success) {
				throw new Error(response.data.message);
			}

			dispatch(setToken(null));
			dispatch(setUser(null));
			// dispatch(resetCart())
			localStorage.removeItem("token");
			localStorage.removeItem("user");
			navigate("/");
			toast.success("Account Deletion Succesfull!!");
		} catch (error) {
			console.log("ACCOUNT DELETION API ERROR ..............", error);
			toast.error("Accunt deletion error !!");
		}
		dispatch(setLoading(false));
	};
}

export function upgradeAccountToInstructor(token, navigate) {
	return async (dispatch) => {
		dispatch(setLoading(true));
		try {
			const response = await apiConnector(
				"PATCH",
				settingsEndpoints.UPGRADE_TO_INSTRUCTOR_API,
				null,
				{
					Authorisation: `Bearer ${token}`,
				}
			);
			console.log("ACCOUNT UPGRADATION RESPONSE .............", response);
			if (!response.data.success) {
				throw new Error(response.data.message);
			}
			dispatch(logout(token, navigate));
			toast.success("Account Upgraded to Instructor!!");
		} catch (error) {
			console.log("ACCOUNT UPGRADATION API ERROR ..............", error);
		}
		dispatch(setLoading(false));
	};
}

export async function getRegisteredCourses(dispatch, token) {
	dispatch(setLoading(true));
	let courses = []
	try {
		const response = await apiConnector(
			"GET",
			profileEndpoints.GET_USER_REGISTERED_COURSES_API,
			null,
			{ Authorization: `Bearer ${token}` }
		);

		console.log("GET REGISTERED COURSES API RESPONSE .............", response.data.data.registeredCourses);
		if (!response.data.success) {
			throw new Error(response.data.message);
		}
		courses = response.data.data.registeredCourses;
		// toast.success("Registered courses fetch successfully!!")
	} catch (error) {
		console.log("GET REGISTERED COURSES API ERROR.............", error)
		// toast.error("Failed to fetch registered courses!!")
	}
	dispatch(setLoading(false));
	return courses;
}

export async function getWishlistData(dispatch, token) {
	dispatch(setLoading(true));
	let wishlist = []
	try {
		const response = await apiConnector(
			"GET",
			profileEndpoints.USER_WISHLIST,
			null,
			{ Authorization: `Bearer ${token}` }
		);

		console.log("GET REGISTERED COURSES API RESPONSE .............", response.data.data);
		if (!response.data.success) {
			throw new Error(response.data.message);
		}
		wishlist = response.data.data.wishlist;
		// toast.success("Registered courses fetch successfully!!")
	} catch (error) {
		console.log("GET REGISTERED COURSES API ERROR.............", error)
		// toast.error("Failed to fetch registered courses!!")
	}
	dispatch(setLoading(false));
	return wishlist;
}
