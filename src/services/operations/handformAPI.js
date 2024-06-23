import toast from "react-hot-toast"
import { setLoading } from "../../features/auth/profileSlice"
import { apiConnector } from "../apiConnector"
import { contactusEndpoint } from "../apis"

export const handleForm = (firstName, lastName, email, contactNumber, message) => {
    return async(dispatch) => {
        dispatch(setLoading(true))
        try {
            const response = await apiConnector("POST", contactusEndpoint.CONTACT_US_API, {firstName, lastName, email, contactNumber, message});

            console.log("CONTACT US RESPONSE ............", response);

			if (!response.data.success) {
				throw new Error(response.data.message);
			}

			toast.success("Form submitted successfully");
        } catch (error) {
            toast.error("Unable to submit form");
			console.log("SEND OTP ERROR ................", error);
        }
        dispatch(setLoading(false))
    }
}