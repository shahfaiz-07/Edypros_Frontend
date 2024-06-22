import { setLoading, setToken } from "../../features/auth/authSlice";
import { setUser } from "../../features/auth/profileSlice";
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

			console.log("SEND OTP RESPONSE ............", response);

			if (!response.data.success) {
				throw new Error(response.data.message);
			}

			toast.success("OTP Sent Successfully");
			navigate("/verify-otp");
		} catch (error) {
			toast.error("Unable to send OTP");
			console.log("SEND OTP ERROR ................");
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
				otp,
			});

			console.log("REGISTER USER RESPONSE ............", response);

			if (!response.data.success) {
				throw new Error(response.data.message);
			}

			toast.success("Account Created Successfully");
			navigate("/login");
		} catch (error) {
			toast.error("Error while creating account");
			console.log("REGISTER USER ERROR ................");
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

			console.log("LOGIN USER RESPONSE ............", response.data.data);

			if (!response.data.success) {
				throw new Error(response.data.message);
			}

			toast.success("Login Successfull");
			dispatch(setToken(response.data.data.accessToken));
            const avatar = response.data?.data?.user?.avatar

			dispatch(setUser({ ...response.data.data.user, image: avatar }));
			localStorage.setItem("user", JSON.stringify(response.data.data.user));
			localStorage.setItem("token", JSON.stringify(response.data.data.accessToken));
			navigate("/dashboard");
		} catch (error) {
			console.log("LOGIN API ERROR ..........", error);
			toast.error("Login Error");
		}
		dispatch(setLoading(false));
	};
}

export function logout(navigate) {
	return (dispatch) => {
		dispatch(setToken(null));
		dispatch(setUser(null));
		// dispatch(resetCart())
		localStorage.removeItem("token");
		localStorage.removeItem("user");
		toast.success("Logged Out");
		navigate("/");
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

			console.log("RESET PASSWORD TOKEN RESPONSE.........", response);

			if (!response.data.success) {
				throw new Error(response.data.message);
			}

			toast.success("Reset Email Sent");
			setEmailSent(true);
		} catch (error) {
			console.log("RESET PASSWORD TOKEN ERROR..........");
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
			console.log("RESET PASSWORD REPONSE............", response);

			if (!response.data.success) {
				throw new Error(response.data.message);
			}

			toast.success("Password reset successfully !!");
			setResetComplete(true);
		} catch (error) {
			console.log("PASSWORD RESET ERROR..............", error.message);
		}
		dispatch(setLoading(false));
	};
}
