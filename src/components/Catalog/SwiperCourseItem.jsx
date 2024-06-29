import React from 'react'
import ReactStars from 'react-stars'
import { useNavigate } from 'react-router';

const SwiperCourseItem = ({course}) => {
    const navigate = useNavigate()
  return (
    <div className="flex-shrink-0 flex flex-col gap-y-[6px] bg-richblack-700 bg-opacity-60 pb-3 rounded-md cursor-pointer"
		onClick={() => navigate(`/course/${course._id}`)}
		>
			<img
				src={course?.thumbnail}
				alt=""
				className="h-56 aspect-[2/1] object-cover rounded-t-md"
			/>
			<div className="px-3 mt-1">
				<h1 className="text-white text-ellipsis text-nowrap overflow-hidden-lg text-xl font-semibold">{course.name}</h1>
				<p className="text-xs font-semibold text-richblack-500 leading-none">
					By Prof. {course?.instructor.firstName} {course.instructor.lastName}
				</p>
			</div>
			<p className="text-richblack-300 text-sm relative px-3">
			<p className="text-ellipsis text-nowrap overflow-hidden">{course.description}</p> 
			</p>
			<div className="text-[#ffd700] text-sm flex items-center gap-x-2 px-3">
				<span>3.5</span>{" "}
				<ReactStars
					count={5}
					value={3.5}
					size={14}
					edit={false}
					color2={"#ffd700"}
				/>{" "}
				<span className="text-richblack-500">({course?.ratingAndReviews.length})</span>
			</div>
            <div className="flex justify-between items-center px-3">
			<p className="text-richblack-5 font-semibold text-lg">Rs. {course.price}</p>
            {
                course?.category[0]?.title && (<p className={`text-sm font-semibold rounded-full px-2 py-1 bg-richblack-700`} style={{color: `#${course?.category[0]?.color}`}}>{course?.category[0]?.title}</p>)
            }
            </div>
		</div>
  )
}

export default SwiperCourseItem
