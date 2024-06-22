import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../components/common/Spinner";
import OtpInput from "react-otp-input";
import { useNavigate } from "react-router";
import { registerUser } from "../services/operations/authAPI";

const VerifyEmail = () => {
	const { loading, signupData } = useSelector((state) => state.auth);
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [otp, setOtp] = useState("");

	const handleOnSubmit = (e) => {
		e.preventDefault();

		const {
			firstName,
			lastName,
			email,
			password,
			confirmPassword,
			accountType
		} = signupData;

		dispatch(registerUser(email, password, confirmPassword, firstName, lastName, accountType, otp, navigate))
	};

	useEffect(() => {
		if (!signupData) {
			navigate("/register");
		}
	}, []);
	return (
		<div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
			{loading ? (
				<Spinner />
			) : (
				<div>
					<h1 className="text-white text-2xl self-start">Verify Email</h1>
					<p className="text-[#AFB2BF] text-sm my-5">
						A six digit verification code has been sent to you. Enter the code
						below.
					</p>
					<form onSubmit={handleOnSubmit}>
						{/* <OtpInput
						value={otp}
						onChange={setOtp}
						numInputs={6}
						renderSeparator={<span>-</span>}
						renderInput={(props) => <input {...props} placeholder="-"/>}
                        // containerStyle=""
                        inputStyle="px-3 rounded text-lg w-10"
                        shouldAutoFocus={true}
					/> */}
						<input
							type="text"
							placeholder="------"
							value={otp}
							onChange={(e) => setOtp(e.target.value)}
							className="w-full px-3 py-2 text-white text-sm bg-richblack-700 rounded"
						/>
						<button className="bg-yellow-50 px-4 py-2 w-full rounded my-5 font-semibold">
							Verify Email
						</button>
					</form>
				</div>
			)}
		</div>
	);
};

export default VerifyEmail;
