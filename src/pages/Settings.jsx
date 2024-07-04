import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
// import { updateAdditionalDetails, updatePassword, updatePfp,deleteAccount } from '../../../services/operations/profileAPI'
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteAccount, updateAvatar, updatePassword, updateProfile, upgradeAccountToInstructor } from "../services/operations/profileAPI";
import ConfirmationModal from './../components/common/ConfirmationModal';
import { ACCOUNT_TYPE } from "../constants";

const Settings = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const {user}=useSelector(state=>state.profile);

	// //update profile picture
	const avatar=useSelector(state=>state.profile.user.avatar);
	const [profilePicture, setprofilePicture] = useState(avatar)
	const {token}= useSelector(state=>state.auth);

	const handleUpload = (e) => {
	  e.preventDefault();
	  const file = e.target[0].files[0];
	  updateAvatar(token,file);
	}

	// const handleAccountUpgrade = (e) => {
	// 	e.preventDefault()
	// }

	const handleFileChange = (e) => {
	  const file = e.target.files[0];
	  setprofilePicture(URL.createObjectURL(file));
	}

	// //update additional info
	const [formData, setFormData] = useState({
	  firstName: "",
	  lastName: "",
	  dateOfBirth: "",
	  gender: "",
	  contactNumber: "",
	  about: "",
	})

	const handleOnChange = (e) => {
	  setFormData((prevData) => ({
	    ...prevData,
	    [e.target.name]: e.target.value,
	  }))
	}

	const handleProfileUpdate = (e) => {
	  e.preventDefault()
	  updateProfile(token,formData);
	}

	// //update password
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);
	const [password, setPassword] = useState({
	  oldPassword: "",
	  newPassword: "",
	  confirmNewPassword: "",
	})
	const [confirmationModal, setConfirmationModal] = useState(null)

	const handleOnChangePassword = (e) => {
	  setPassword((prevData) => ({
	    ...prevData,
	    [e.target.name]: e.target.value,
	  }))
	}

	const handlePassword = async (e) => {
	  e.preventDefault()
	  const {newPassword, confirmNewPassword } = password;
	  if (newPassword === confirmNewPassword) {
	    await updatePassword(token,password);
		setPassword({
			oldPassword: "",
	  newPassword: "",
	  confirmNewPassword: "",
		})
	  } else {
	    alert("Password does not match")
	  }
	}

	// //delete account
	// const onDeleteAccount = () => {
	//   if(window.confirm
	//     ("Are you sure you want to delete your account?")){
	//       deleteAccount(token, navigate)
	//     }

	// }

	return (
		<div>
			<div className=" flex-1 overflow-auto">
				<div className="mx-auto md:w-11/12 max-w-[1000px] py-10">
					<h1 className="mb-5 md:mb-14 text-3xl font-medium text-richblack-5">
						Edit Profile
					</h1>

					<div className="flex items-center justify-between rounded-md border-[1px] border-richblack-700 bg-richblack-800 md:p-8 md:px-12 px-3 py-3 text-richblack-5">
						<div className="flex items-center gap-x-4 p-2">
							<img
								className="aspect-square w-[78px] rounded-full object-cover"
								src={profilePicture}
							></img>
							<div className="space-y-2">
								<p>Change Profile Picture</p>
								<form 
                onSubmit={handleUpload}
                >
									<div className="flex flex-row gap-3">
										<label
											className="cursor-pointer rounded-md bg-richblack-700 py-2 px-5 font-semibold text-richblack-50'"
											htmlFor="upload"
										>
											Select
											<input
												id="upload"
												type="file"
												onChange={handleFileChange}
												className="hidden"
												accept="image/png, image/gif, image/jpeg"
											/>
										</label>
										<button
											type="submit"
											className="flex items-center bg-yellow-50 cursor-pointer gap-x-2 rounded-md py-2 px-5 font-semibold text-richblack-900 undefined"
										>
											Upload
										</button>
									</div>
								</form>
							</div>
						</div>
					</div>

					<form 
          onSubmit={handleProfileUpdate}
          >
						<div className="my-10 flex flex-col gap-y-6 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-4 md:p-8 md:px-12">
							<h2 className="text-lg font-semibold text-richblack-5">
								Profile Information
							</h2>
							<div className="flex flex-col gap-5 lg:flex-row">
								<div className="flex flex-col gap-2 lg:w-[48%]">
									<label htmlFor="firstName" className=" text-richblack-50">
										First Name
									</label>
									<input
										defaultValue={user.firstName || null}
										type="text"
										name="firstName"
										id="firstName"
										placeholder="Enter first name"
										className="form-style"
										onChange={handleOnChange}
									/>
								</div>
								<div className="flex flex-col gap-2 lg:w-[48%]">
									<label htmlFor="lastName" className="text-richblack-50">
										Last Name
									</label>
									<input
										defaultValue={user.lastName || null}
										type="text"
										name="lastName"
										id="lastName"
										placeholder="Enter first name"
										className="form-style"
										onChange={handleOnChange}
									/>
								</div>
							</div>
							<div className="flex flex-col gap-5 lg:flex-row">
								<div className="flex flex-col gap-2 lg:w-[48%]">
									<label htmlFor="dob" className="text-richblack-50">
										Date of Birth
									</label>
									<input
										defaultValue={user?.profile.dob || null}
										type="date"
										name="dob"
										id="dob"
										className="form-style"
										onChange={handleOnChange}
									/>
								</div>
								<div className="flex flex-col gap-2 lg:w-[48%]">
									<label htmlFor="gender" className="text-richblack-50">
										Gender
									</label>
									<select
										defaultValue={user?.profile.gender || null}
										type="text"
										name="gender"
										id="gender"
										className="form-style"
										onChange={handleOnChange}
									>
										<option value="Prefer not to say">Prefer not to say</option>
										<option value="Male">Male</option>
										<option value="Female">Female</option>
										<option value="Other">Others</option>
									</select>
								</div>
							</div>
							<div className="flex flex-col gap-5 lg:flex-row">
								<div className="flex flex-col gap-2 lg:w-[48%]">
									<label htmlFor="contactNumber" className="text-richblack-50">
										Contact Number
									</label>
									<input
										defaultValue={user?.profile.contactNumber || null}
										type="tel"
										name="contactNumber"
										id="contactNumber"
										placeholder="Enter Contact Number"
										className="form-style"
										onChange={handleOnChange}
									/>
								</div>
								<div className="flex flex-col gap-2 lg:w-[48%]">
									<label htmlFor="about" className="text-richblack-50">
										About
									</label>
									<input
										defaultValue={user?.profile.about || null}
										type="text"
										name="about"
										id="about"
										placeholder="Enter Bio Details"
										className="form-style"
										onChange={handleOnChange}
									/>
								</div>
							</div>
						</div>
						<div className="flex justify-end gap-2">
							<button
								className="flex items-center bg-yellow-50 cursor-pointer gap-x-2 rounded-md py-2 px-5 font-semibold text-richblack-900 undefined"
								type="submit"
							>
								Save
							</button>
						</div>
					</form>

					<form 
          onSubmit={handlePassword}
          >
						<div>
							<div className=" relative mt-4">
								<label className="w-full">
									<p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
										Old Password <sup className="text-pink-200">*</sup>
									</p>
									<input
										required
										type={showPassword ? "text" : "password"}
										name="oldPassword"
										value={password.oldPassword}
										onChange={handleOnChangePassword}
										placeholder="Enter Password"
										style={{
											boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
										}}
										className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] pr-12 text-richblack-5"
									/>
								</label>
								<span
									onClick={() => setShowPassword((prev) => !prev)}
									className="absolute right-3 top-9 z-[10] cursor-pointer text-white"
								>
									{showPassword ? (
										<i className="ri-eye-fill"></i>
									) : (
										<i className="ri-eye-off-fill"></i>
									)}
								</span>
							</div>
							<div className=" relative mt-4">
								<label className="w-full">
									<p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
										New Password <sup className="text-pink-200">*</sup>
									</p>
									<input
										required
										type={showConfirmPassword ? "text" : "password"}
										name="newPassword"
										value={password.newPassword}
										onChange={handleOnChangePassword}
										placeholder="Enter Password"
										style={{
											boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
										}}
										className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] pr-12 text-richblack-5"
									/>
								</label>
								<span
									onClick={() => setShowConfirmPassword((prev) => !prev)}
									className="absolute right-3 top-9 z-[10] cursor-pointer text-white"
								>
									{showConfirmPassword ? (
										<i className="ri-eye-fill"></i>
									) : (
										<i className="ri-eye-off-fill"></i>
									)}
								</span>
							</div>
							<div className=" relative mt-4">
								<label className="w-full">
									<p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
										Confirm New Password <sup className="text-pink-200">*</sup>
									</p>
									<input
										required
										type={showConfirmPassword ? "text" : "password"}
										name="confirmNewPassword"
										value={password.confirmNewPassword}
										onChange={handleOnChangePassword}
										placeholder="Enter Password"
										style={{
											boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
										}}
										className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] pr-12 text-richblack-5"
									/>
								</label>
								<span
									onClick={() => setShowConfirmPassword((prev) => !prev)}
									className="absolute right-3 top-10 z-[10] cursor-pointer text-white"
								>
									{showConfirmPassword ? (
										<i className="ri-eye-fill"></i>
									) : (
										<i className="ri-eye-off-fill"></i>
									)}
								</span>
							</div>
						</div>
						<div className="flex justify-end gap-2 mt-3">
							<button
								className="flex items-center bg-yellow-50 cursor-pointer gap-x-2 rounded-md py-2 px-5 font-semibold text-richblack-900 undefined"
								type="submit"
							>
								Save
							</button>
						</div>
					</form>

					{
						user.accountType === ACCOUNT_TYPE.STUDENT
						?
						<div className="my-10 gap-x-5 flex p-3 md:p-8 md:px-12 bg-blue-700 border-blue-500 rounded-md">
							<div className="flex aspect-square h-14 w-14 items-center justify-center rounded-full text-3xl text-blue-700 bg-blue-200">
							<i className="ri-graduation-cap-line"></i>
							</div>
							<div className="flex flex-col space-y-2 w-full">
							<h2 className="text-lg font-semibold text-richblack-5">
								Become an Instructor
							</h2>
							<div className="md:w-3/5 text-blue-25">
								<p>Would you like to delete account?</p>
								<p>
									This account may contain Paid Courses. Upgrading your account
									is permanent and will remove all the purchased courses associated with it.
								</p>
							</div>
							<button
								type="button"
								onClick={ () => setConfirmationModal({
									text1: "Are You Sure ?",
									text2: "Your purchased courses will be removed permanently. The profile data along with your password will be retained.",
									btn1Text: "Upgrade",
									btn2Text:"Cancel",
									btn1Handler: () => dispatch(upgradeAccountToInstructor(token, navigate)),
									btn2Handler: () => setConfirmationModal(null),
								})}
								className="w-fit cursor-pointer italic text-blue-300"
							>
								I want to upgrade my account.
							</button>
						</div>
						</div>
						:
						""
					}
					<div className="my-10 flex flex-row gap-x-5 rounded-md border-[1px] border-pink-700 bg-pink-900 p-3 md:p-8 md:px-12">
						<div className="flex aspect-square h-14 w-14 items-center justify-center rounded-full bg-pink-700">
							<svg
								stroke="currentColor"
								fill="none"
								strokeWidth="2"
								viewBox="0 0 24 24"
								strokeLinecap="round"
								strokeLinejoin="round"
								className="text-3xl text-pink-200"
								height="1em"
								width="1em"
								xmlns="http://www.w3.org/2000/svg"
							>
								<polyline points="3 6 5 6 21 6"></polyline>
								<path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
								<line x1="10" y1="11" x2="10" y2="17"></line>
								<line x1="14" y1="11" x2="14" y2="17"></line>
							</svg>
						</div>
						
						<div className="flex flex-col space-y-2 w-full">
							<h2 className="text-lg font-semibold text-richblack-5">
								Delete Account
							</h2>
							<div className="md:w-3/5 text-pink-25">
								<p>Would you like to delete account?</p>
								<p>
									This account may contain Paid Courses. Deleting your account
									is permanent and will remove all the content associated with
									it.
								</p>
							</div>
							<button
								type="button"
								onClick={ () => setConfirmationModal({
									text1: "Are You Sure ?",
									text2: "Your Account and related data along with purchased courses will be deleted permanently",
									btn1Text: "Delete",
									btn2Text:"Cancel",
									btn1Handler: () => dispatch(deleteAccount(token, navigate)),
									btn2Handler: () => setConfirmationModal(null),
								})}
								className="w-fit cursor-pointer italic text-pink-300"
							>
								I want to delete my account.
							</button>
						</div>
					</div>
				</div>
			</div>
			{confirmationModal && <ConfirmationModal modalData={confirmationModal} setConfirmationModal={setConfirmationModal}/>}
		</div>
	);
};

export default Settings;
