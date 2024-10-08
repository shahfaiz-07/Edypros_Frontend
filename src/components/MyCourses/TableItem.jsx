import React, { useState } from "react";
import moment from "moment";
import { COURSE_STATUS } from "../../constants";
import ConfirmationModal from "./../common/ConfirmationModal";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { deleteCourse } from "../../services/operations/courseAPI";
import {
	formatDuration,
	totalCourseDuration,
} from "./../../utils/totalDuration";
const TableItem = ({ course }) => {
	const { token } = useSelector((state) => state.auth);
	const [confirmationModal, setConfirmationModal] = useState(null);
	const navigate = useNavigate();

	const handleDeleteCourse = async (courseId) => {
		await deleteCourse(courseId, token);
	};

	const handleEditCourse = (courseId) => {
		navigate(`/dashboard/edit-course/${courseId}`);
	};
	return (
		<div className="p-3 flex flex-col lg:flex-row gap-3 w-full">
			<div className="lg:w-[70%] flex flex-col lg:flex-row gap-3">
				<img
					src={course.thumbnail}
					alt="Course Thumbnail"
					className="rounded-md w-full lg:w-44 aspect-video object-cover"
				/>
				<div className="flex flex-col gap-1 justify-between">
					<p className="text-richblack-5 font-semibold">{course.name}:</p>
					<p className="text-richblack-400 text-sm">
						{course.description.slice(0, 70)}{" "}
						{course.description.length > 70 && "..."}
					</p>
					<p className="text-richblack-5 text-xs">
						Created : {moment(course.createdAt).format("MMMM Do YYYY | h:mm a")}
					</p>
					<div className="flex gap-x-2 mt-1">
						<p
							className="w-fit text-xs py-1 px-2 rounded-full bg-richblack-700 font-semibold"
							style={{ color: `#${course.category.color}` }}
						>
							{course.category.title}
						</p>
						<p
							className={`w-fit text-xs py-1 px-2 rounded-full bg-richblack-700 space-x-1 ${
								course.status === COURSE_STATUS.PUBLISHED
									? "text-yellow-50"
									: "text-pink-300"
							}`}
						>
							{course.status === COURSE_STATUS.PUBLISHED ? (
								<i className="ri-checkbox-circle-fill"></i>
							) : (
								<i className="ri-time-fill"></i>
							)}{" "}
							<span>{course.status}</span>
						</p>
					</div>
					<div className="flex justify-between">
						<p className="lg:hidden text-richblack-300 text-sm">
							<i className="ri-time-fill"></i>{" "}
							{formatDuration(totalCourseDuration(course))} | ₹{course.price}
						</p>
						<div className="grid lg:hidden place-content-center text-richblack-50 text-lg ">
							<div className="flex gap-x-2">
								<i
									className="ri-pencil-line cursor-pointer"
									onClick={() => handleEditCourse(course._id)}
								></i>{" "}
								<i
									className="ri-delete-bin-6-line cursor-pointer"
									onClick={() =>
										setConfirmationModal({
											text1: "Are You Sure ?",
											text2:
												"Your course data and it's related content will be deleted permanently.",
											btn1Text: "Delete",
											btn2Text: "Cancel",
											btn1Handler: () => handleDeleteCourse(course._id),
											btn2Handler: () => setConfirmationModal(null),
										})
									}
								></i>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="hidden lg:grid place-content-center text-richblack-5 text-sm w-[10%]">
				{formatDuration(totalCourseDuration(course))}
			</div>
			<div className="hidden lg:grid place-content-center text-richblack-5 text-sm w-[10%]">
				<p>₹{course.price}</p>
			</div>
			<div className="hidden lg:grid place-content-center text-richblack-50 text-lg w-[10%]">
				<div className="flex gap-x-2">
					<i
						className="ri-pencil-line cursor-pointer"
						onClick={() => handleEditCourse(course._id)}
					></i>{" "}
					<i
						className="ri-delete-bin-6-line cursor-pointer"
						onClick={() =>
							setConfirmationModal({
								text1: "Are You Sure ?",
								text2:
									"Your course data and it's related content will be deleted permanently.",
								btn1Text: "Delete",
								btn2Text: "Cancel",
								btn1Handler: () => handleDeleteCourse(course._id),
								btn2Handler: () => setConfirmationModal(null),
							})
						}
					></i>
				</div>
			</div>
			{confirmationModal && (
				<ConfirmationModal
					modalData={confirmationModal}
					setConfirmationModal={setConfirmationModal}
				/>
			)}
		</div>
	);
};

export default TableItem;
