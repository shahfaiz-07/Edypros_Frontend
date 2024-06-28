import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { COURSE_STATUS } from "../../constants";
import { resetCourseState } from "../../features/courses/courseSlice";
import { changeCourseStatus } from "../../services/operations/courseAPI";
import { useNavigate } from "react-router";

const PublishCourse = () => {
	const { token } = useSelector((state) => state.auth);
	const { course } = useSelector((state) => state.course);
	const navigate = useNavigate()
	const dispatch = useDispatch();
	const {
		register,
		setValue,
		getValues,
	} = useForm();

	useEffect(() => {
		setValue("public", course?.status === COURSE_STATUS.PUBLISHED);

	}, []);

	const handlePublish = async () => {
		if (
			(course?.status === COURSE_STATUS.PUBLISHED &&
				getValues("public") === true) ||
			(course?.status === COURSE_STATUS.DRAFT && getValues("public") === false)
		) {
			dispatch(resetCourseState());
			navigate("/dashboard/my-courses")
		} else {
			await changeCourseStatus(
				dispatch,
				{
					courseId: course._id,
					status: getValues("public")
						? COURSE_STATUS.PUBLISHED
						: COURSE_STATUS.DRAFT,
				},
				token,
				navigate
			);
			dispatch(resetCourseState())
		}
	};
	return (
		<div className="mx-auto w-11/12 max-w-maxContent bg-richblack-800 rounded-lg p-6 font-inter border border-richblack-700">
			<div className="space-y-5">
				<h2 className="text-richblack-5 font-semibold text-2xl">
					Publish Settings
				</h2>
				<label htmlFor="confirmation" className="flex gap-3">
					<input
						type="checkbox"
						name="confirmation"
						id="confirmation"
						className="bg-transparent"
						{...register("public")}
					/>
					<span className="text-richblack-500 font-semibold">
						Make this Course Public
					</span>
				</label>
			</div>
			<div className="flex justify-end gap-x-3 mt-5">
				<button
					onClick={() => {
						dispatch(setStep(2));
					}}
					className="flex cursor-pointer items-center gap-x-2 rounded-md bg-richblack-300 py-[8px] px-[20px] font-semibold text-richblack-900"
				>
					Back
				</button>
				<button
					onClick={() => handlePublish()}
					className="flex items-center bg-yellow-50 cursor-pointer gap-x-2 rounded-md py-2 px-5 font-semibold text-richblack-900 undefined"
				>
					<span className="false">Next</span>
					<svg
						stroke="currentColor"
						fill="currentColor"
						strokeWidth="0"
						viewBox="0 0 24 24"
						height="1em"
						width="1em"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path fill="none" d="M0 0h24v24H0z"></path>
						<path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"></path>
					</svg>
				</button>
			</div>
		</div>
	);
};

export default PublishCourse;
