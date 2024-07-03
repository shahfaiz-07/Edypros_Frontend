import React from "react";
import { calculateAverageCourseRating } from "../../utils/calculateAverageRating";
import ReactStars from "react-stars";

const CourseItem = ({ course }) => {
	const averageRating = calculateAverageCourseRating(course);
	return (
		<div className="w-1/3 flex flex-col gap-y-1 pb-3 overflow-hidden bg-pure-greys-800 rounded mt-2">
			<img
				src={course.thumbnail}
				alt=""
				className="w-full object-cover aspect-video"
			/>
			<h4 className="text-richblack-25 font-semibold px-3">
				{course.name.slice(0, 30)} {course.name.length > 30 && "..."}
			</h4>
			<div className="flex gap-x-2 items-center text-sm px-3">
				<span className="text-yellow-50">{averageRating}</span>{" "}
				<ReactStars
					count={5}
					value={averageRating}
					size={14}
					edit={false}
					color2={"#ffd700"}
				/>{" "}
				<span className="text-richblack-300">
					({course.ratingAndReviews.length})
				</span>
			</div>
			<p
				className="w-fit rounded-full text-xs bg-richblack-700 px-2 py-1 mx-3 font-semibold"
				style={{ color: `#${course.category.color}` }}
			>
				{course.category.title}
			</p>
			<div className="flex gap-x-3 text-sm text-richblack-200 px-3">
				<p className="">Rs. {course.price}</p> |{" "}
				<p className="">{course.studentsEnrolled} student(s) enrolled</p>
			</div>
		</div>
	);
};

export default CourseItem;
