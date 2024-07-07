import { setLoading, setToken } from "../../features/auth/authSlice";
import { setUser } from "../../features/auth/profileSlice";
import { setTotalItems } from "../../features/wishlist/wishlistSlice";
import { apiConnector } from "../apiConnector";
import { endpoints } from "../apis";
import { toast } from "react-hot-toast";

export function sendOTP(email, navigate) {
	return async (dispatch) => {
		dispatch(setLoading(true));
		try {
			const response = await apiConnector("POST", endpoints.SENDOTP_API, {
				email,
			});

			// console.log("SEND OTP RESPONSE ............", response);

			if (!response.data.success) {
				throw new Error(response.data.message);
			}

			toast.success("OTP Sent Successfully");
			navigate("/verify-otp");
		} catch (error) {
			toast.error("Unable to send OTP");
			// console.log("SEND OTP ERROR ................");
		}
		dispatch(setLoading(false));
	};
}

export function registerUser(
	email,
	password,
	confirmPassword,
	firstName,
	lastName,
	accountType,
	contactNumber,
	otp,
	navigate
) {
	return async (dispatch) => {
		dispatch(setLoading(true));
		try {
			const response = await apiConnector("POST", endpoints.REGISTER_API, {
				email,
				password,
				confirmPassword,
				firstName,
				lastName,
				accountType,
				contactNumber,
				otp,
			});

			// console.log("REGISTER USER RESPONSE ............", response);

			if (!response.data.success) {
				throw new Error(response.data.message);
			}

			toast.success("Account Created Successfully");
			navigate("/login");
		} catch (error) {
			toast.error("Error while creating account");
			// console.log("REGISTER USER ERROR ................", error);
		}
		dispatch(setLoading(false));
	};
}

export function login(email, password, navigate) {
	return async (dispatch) => {
		dispatch(setLoading(true));
		try {
			const response = await apiConnector("POST", endpoints.LOGIN_API, {
				email,
				password,
			});

			// console.log("LOGIN USER RESPONSE ............", response.data.data);

			if (!response.data.success) {
				throw new Error(response.data.message);
			}

			// console.log("COOKIES............ ");

			toast.success("Login Successfull");
			dispatch(setToken(response.data.data.accessToken));

			dispatch(setUser({ ...response.data.data.user }));
			dispatch(setTotalItems(response.data.data.user.wishlist.length))
			localStorage.setItem("user", JSON.stringify(response.data.data.user));
			localStorage.setItem(
				"token",
				JSON.stringify(response.data.data.accessToken)
			);
			navigate("/dashboard/my-profile");
		} catch (error) {
			// console.log("LOGIN API ERROR ..........", error);
			toast.error(error.response.data.message);
		}
		dispatch(setLoading(false));
	};
}

export function logout(token, navigate) {
	return async (dispatch) => {
		const toastId = toast.loading("Logging Out...");
		try {
			// console.log("LOGOUT TOKEN.........	", token);
			// const response = await apiConnector("POST", endpoints.LOGOUT_API, null, {
			// 	Authorisation: `Bearer ${token}`,
			// });
			// if (!response.data.success) {
			// 	throw new Error(response.data.message);
			// }
			// console.log("LOGOUT API RESPONSE ...........", response);
			dispatch(setToken(null));
			dispatch(setUser(null));
			// dispatch(resetCart())
			localStorage.removeItem("token");
			localStorage.removeItem("user");
			toast.success("Logged Out");
			navigate("/");
		} catch (error) {
			// console.log("LOGOUT API ERROR ..........", error);
			toast.error("Error while logout");
		}
		toast.dismiss(toastId);
	};
}

export function getPasswordResetToken(email, setEmailSent) {
	return async (dispatch) => {
		dispatch(setLoading(true));
		try {
			const response = await apiConnector(
				"POST",
				endpoints.RESETPASSTOKEN_API,
				{ email }
			);

			// console.log("RESET PASSWORD TOKEN RESPONSE.........", response);

			if (!response.data.success) {
				throw new Error(response.data.message);
			}

			toast.success("Reset Email Sent");
			setEmailSent(true);
		} catch (error) {
			// console.log("RESET PASSWORD TOKEN ERROR..........");
			toast.error(error.response.data.message)
		}
		dispatch(setLoading(false));
	};
}

export function resetPassword(
	password,
	confirmPassword,
	token,
	setResetComplete
) {
	return async (dispatch) => {
		dispatch(setLoading(true));
		try {
			const response = await apiConnector(
				"POST",
				`${endpoints.RESETPASSWORD_API}/${token}`,
				{ password, confirmPassword }
			);
			// console.log("RESET PASSWORD REPONSE............", response);

			if (!response.data.success) {
				throw new Error(response.data.message);
			}

			toast.success("Password reset successfully !!");
			setResetComplete(true);
		} catch (error) {
			// console.log("PASSWORD RESET ERROR..............", error.message);
			toast.error(error.response.data.message)
		}
		dispatch(setLoading(false));
	};
}
