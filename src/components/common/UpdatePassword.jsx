import React, { useState } from "react";
import Spinner from "./Spinner";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import { resetPassword } from "../../services/operations/authAPI";

const UpdatePassword = () => {
	const { loading } = useSelector((state) => state.auth);

	const [formData, setFormData] = useState({
		password: "",
		confirmPassword: "",
	});

	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);

	const [resetComplete, setResetComplete] = useState(false);

	const dispatch = useDispatch();

	const location = useLocation();
	const handleOnChange = (e) => {
		setFormData((prev) => ({
			...prev,
			[e.target.name]: e.target.value,
		}));
	};

	const handleOnSubmit = (e) => {
		e.preventDefault();
		const token = location.pathname.split("/").at(-1);
		dispatch(resetPassword(formData.password, formData.confirmPassword, token, setResetComplete));
	};
	return (
		<div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
			{loading ? (
				<Spinner />
			) : (
				<div className="">
					<h1 className="text-white text-2xl">
						{!resetComplete ? "Choose a new password" : "Reset complete!"}
					</h1>
					<p className="text-[#AFB2BF] text-sm my-5">
						{!resetComplete
							? "Almost done. Enter your new password and you're all set."
							: `All done! We have sent an email to m***********@gmail.com to confirm`}
					</p>
					{!resetComplete ? (
						<div className="w-full">
							<form className="flex flex-col gap-5" onSubmit={handleOnSubmit}>
								<label className="w-full">
									<p className="text-[#F1F2FF] text-sm p-2">
										New Password <sup className="text-pink-200">*</sup>
									</p>
									<div className="w-full flex items-center relative">
										<input
											type={showPassword ? "text" : "password"}
											name="password"
											value={formData.password}
											onChange={handleOnChange}
											placeholder="Enter new password..."
											className="text-white bg-richblack-800 px-3 py-2 rounded text-sm w-full relative"
										/>
										<div
											className="text-white absolute text-lg left-[100%] -translate-x-[140%] cursor-pointer"
											onClick={() => setShowPassword((prev) => !prev)}
										>
											{showPassword ? (
												<i className="ri-eye-line"></i>
											) : (
												<i className="ri-eye-off-line"></i>
											)}
										</div>
									</div>
								</label>
								<label className="w-full">
									<p className="text-[#F1F2FF] text-sm p-2">
										Confirm New Password <sup className="text-pink-200">*</sup>
									</p>
									<div className="w-full flex items-center relative">
										<input
											type={showConfirmPassword ? "text" : "password"}
											name="confirmPassword"
											value={formData.confirmPassword}
											onChange={handleOnChange}
											placeholder="Re-enter new password..."
											className="text-white bg-richblack-800 px-3 py-2 rounded text-sm w-full relative"
										/>
										<div
											className="text-white absolute text-lg left-[100%] -translate-x-[140%] cursor-pointer"
											onClick={() => setShowConfirmPassword((prev) => !prev)}
										>
											{showConfirmPassword ? (
												<i className="ri-eye-line"></i>
											) : (
												<i className="ri-eye-off-line"></i>
											)}
										</div>
									</div>
								</label>
								<button className="px-2 py-2 bg-yellow-50 rounded font-semibold">
									Reset Password
								</button>
							</form>
							<div className="text-white text-xs my-3">
								<Link to="/login">
									<i className="ri-arrow-left-line"></i>{" "}
									<span>Back to Login</span>
								</Link>
							</div>
						</div>
					) : (
						<Link to="/login" className="w-full mx-auto px-4 py-3 bg-yellow-50 rounded font-semibold">
							<i class="ri-arrow-left-circle-line"></i> Return to Login
						</Link>
					)}
				</div>
			)}
		</div>
	);
};

export default UpdatePassword;
