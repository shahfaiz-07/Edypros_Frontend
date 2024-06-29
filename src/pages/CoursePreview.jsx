import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCoursePreview } from "../services/operations/courseAPI";
import { useParams } from "react-router";
import Spinner from "./../components/common/Spinner";
import ReactStars from "react-stars";
import moment from "moment";
import CourseContent from "../components/CoursePreview/CourseContent";
import BuyNowCard from './../components/CoursePreview/BuyNowCard';

const CoursePreview = () => {
	const { loading } = useSelector((state) => state.profile);
	const dispatch = useDispatch();
	const { courseId } = useParams();
	const [courseDetails, setCourseDetails] = useState(null);

	const fetchCoursePreview = async () => {
		const result = await getCoursePreview(dispatch, courseId);
		setCourseDetails(result);
	};

	useEffect(() => {
	    console.log("Course Id", courseId)
	    fetchCoursePreview()
	}, [courseId])
	return !courseDetails ? (
		<Spinner/>
	) : (
		<div className="font-inter">
			<div className="">
				<div className="bg-[#161D29]">
					<div className="w-11/12 mx-auto flex flex-col gap-y-2 p-3 lg:px-6 lg:py-10">
						<h1 className="text-richblack-5 text-4xl font-semibold">
							{courseDetails?.name}
						</h1>
						<p className="text-richblack-400">{courseDetails?.description}</p>
						<div className="flex items-center gap-x-2">
							<span className="text-yellow-50">3.5</span>{" "}
							<ReactStars
								count={5}
								value={3.5}
								size={14}
								edit={false}
								color2={"#ffd700"}
							/>{" "}
							<span className="text-richblack-500">
								({courseDetails?.ratingAndReviews?.length} reviews)
							</span>{" "}<span className="text-richblack-500">|</span>{" "}
                            <p className="text-richblack-500">{courseDetails?.studentsEnrolled?.length} students enrolled</p>
						</div>
                        <div className="text-richblack-100 text-sm">
                        <p className="">Created By {courseDetails?.instructor?.firstName} {courseDetails?.instructor?.lastName}</p>
                        <p className="">
                        < i className="ri-time-line"></i>{" "}Created On {moment(courseDetails?.createdAt).format("MMMM Do YYYY | h:mm A")}</p>
                        </div>
					</div>
				</div>
                <div className="w-11/12 mx-auto max-w-maxContent justify-between flex flex-col md:flex-row p-2 md:gap-x-5">
                    {/* course Details Section */}
                    <div className="md:w-[70%]">
                        <div className="border border-richblack-500 rounded py-2 px-4 md:px-6 md:p-4 space-y-2">
                            <h3 className="text-2xl text-richblack-5 font-semibold">What you'll learn</h3>
                            <p className="text-richblack-400">{courseDetails?.learnings}</p>
                        </div>
                        <CourseContent course={courseDetails}/>
                        {/* Instructor */}
                        <div className="my-4 space-y-4">
                            <h3 className="text-2xl text-richblack-5 font-semibold">
                                Instructor
                            </h3>
                            <div className="flex gap-x-3 items-center text-lg">
                                <img src={courseDetails?.instructor?.avatar} alt=""  className="aspect-square w-10"/>
                                <p className="text-richblack-100 font-semibold">{courseDetails?.instructor?.firstName} {courseDetails?.instructor?.lastName}</p>
                            </div>
                            {
                                courseDetails.instructor?.profile?.about && 
                                    <p className="text-richblack-300">{courseDetails?.instructor?.profile?.about}</p>
                                
                            }
                        </div>
                    </div>
                    {/* buy now section */}
                    <div className="md:w-[30%]">
                        <BuyNowCard course={courseDetails}/>
                    </div>
                </div>
			</div>
		</div>
	);
};

export default CoursePreview;
