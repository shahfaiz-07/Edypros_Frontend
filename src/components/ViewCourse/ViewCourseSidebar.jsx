import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import {
	formatDuration,
	totalCourseDuration,
	totalSectionDuration,
} from "../../utils/totalDuration";
import { setCurrentSection, setCurrentVideo } from "../../features/registeredCourses/viewCourseSlice";
import CourseReviewModal from "./CourseReviewModal";

const ViewCourseSidebar = () => {
	const { courseData, completedLectures, totalLectures, ratingAndReview, duration } = useSelector(
		(state) => state.viewCourse
	);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { sectionId, videoId } = useParams();
	const [ addReviewModalData, setAddReviewModalData] = useState(false)
	useEffect( () => {
		if(courseData) {
			const currentSection = courseData.sections.filter( (section) => section._id === sectionId) 
			dispatch(setCurrentSection(currentSection[0]))
		}
	}, [sectionId])

	return (
		courseData && (
			<div className="w-full pt-5 lg:py-5 font-inter">
				<div className="px-2 pb-2  flex justify-between">
					<button
						className="rounded-full aspect-square w-10 text-sm grid place-content-center bg-richblack-700 text-richblack-5"
						onClick={() => navigate("/dashboard/registered-courses")}
					>
						<i className="ri-arrow-go-back-line"></i>
					</button>
					<button className="bg-yellow-50 px-2 py-1 rounded text-sm font-bold" onClick={() => setAddReviewModalData(true)}>
						{ratingAndReview ? <i className="ri-file-edit-line"></i> : <i className="ri-chat-new-line"></i>} {ratingAndReview ? "Edit" : "Add"} Review
					</button>
				</div>
				<div className=" lg:my-3">
					<div className="text-light text-richblack-50 px-2 text-xs">
						{completedLectures.length} / {totalLectures} | {duration}
					</div>
					{courseData?.sections?.map((section, index) => (
						<details key={section._id} className="my-1" open>
							<summary className="p-2 text-richblack-5 flex flex-col border-y border-richblack-600 bg-richblack-700">
								<p className="flex justify-between">
									<span className="font-bold">
										Section {index + 1} : {section.name}
									</span>
									<i className="ri-arrow-down-s-fill"></i>
								</p>
								<p className="text-xs font-light">
									<i className="ri-time-fill text-light"></i>{" "}
									{formatDuration(totalSectionDuration(section))}
								</p>
							</summary>
							{section.videos.map((video) => (
								<div
									key={video._id}
									className={`text-sm border-b border-richblack-400 ${
										videoId === video._id
											? "bg-yellow-100 text-black font-semibold"
											: "text-richblack-5  "
									} p-2 flex gap-x-2 cursor-pointer`}
									onClick={() => {
										navigate(
											`/view-course/${courseData._id}/${section._id}/${video._id}`
										);
										dispatch(setCurrentVideo(video))
									}}
								>
									<p>
										{completedLectures.includes(video._id) ? (
											<i className="ri-checkbox-fill"></i>
										) : (
											<i className="ri-checkbox-blank-line"></i>
										)}
									</p>
									<div>
										<p>{video.title}</p>
										<p
											className={`text-[12px] ${
												videoId !== video._id && "text-richblack-200"
											} font-semibold`}
										>
											<i className="ri-file-video-line"></i>{" "}
											<span>{formatDuration(video.duration)}</span>
										</p>
									</div>
								</div>
							))}
						</details>
					))}
				</div>
				{addReviewModalData && <CourseReviewModal setModalData = {setAddReviewModalData}/>}
			</div>
		)
	);
};

export default ViewCourseSidebar;
