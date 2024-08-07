import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getRegisteredCourses } from '../services/operations/profileAPI';
import Spinner from '../components/common/Spinner';
import ProgressBar from "@ramonak/react-progress-bar";
import { useNavigate } from 'react-router';
import { formatDuration, totalCourseDuration } from './../utils/totalDuration';
import { totalCourseLectures } from './../utils/totalCourseLectures';
import { resetViewCourse } from '../features/registeredCourses/viewCourseSlice';

const RegisteredCourses = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const {loading} = useSelector(state => state.profile);
    const {token} = useSelector(state => state.auth)

    const [registeredCourses, setRegisteredCourses] = useState(null);

    const fetchRegisteredCourses = async () => {
         const response = await getRegisteredCourses(dispatch, token);
         setRegisteredCourses(response)
    }

    useEffect(()=> {
        fetchRegisteredCourses();
        dispatch(resetViewCourse())
        // console.log("Registered Courses Array :",registeredCourses)
    }, [])
  return (
    (loading || !registeredCourses)
    ?
    <Spinner/>
    :
    (registeredCourses.length === 0
        ?
        <div className='min-h-[calc(100vh-3.5rem)] grid place-content-center text-center'>
            <h1 className='text-richblack-5 text-3xl font-semibold py-2'>No Courses Registered</h1>
            <p className='text-[#AFB2BF] font-semibold'>You have no purchased courses yet. Add to wishlist to start your learning jouney now</p>
        </div>
        :
        <div className='pt-7'>
<div className='min-h-[calc(100vh-3.5rem)] lg:w-11/12 mx-auto font-inter'>
<h1 className="text-3xl mb-5 text-richblack-5">Enrolled Courses</h1>
            <div className='rounded w-full border mx-auto grid grid-cols-1 md:grid-cols-2 lg:flex lg:flex-col gap-2 lg:gap-0 lg:max-w-maxContent lg:border-richblack-500'>
                <div className='lg:flex px-2 py-3 bg-[#2C333F] text-richblack-5 uppercase text-sm font-semibold hidden'>
                    <p className='w-[55%]'>Course Name</p>
                    <p className='w-[15%] text-center'>Durations</p>
                    <p className='w-[20%] text-center'>Progress</p>
                    <p className='w-[10%] text-center'>Options</p>
                </div>
            {
                registeredCourses.map( (course) => (
                    <div key={course._id} className='px-3 py-4 flex lg:border-b border-richblack-500 rounded-lg lg:rounded-none bg-richblack-800 lg:bg-richblack-900 hover:bg-opacity-40'>
    <div className='lg:w-[55%] flex flex-col lg:flex-row gap-3 w-full'>
        <img src={course.courseId.thumbnail} alt="" className='aspect-[5/3] lg:h-32 w-full lg:w-auto object-cover rounded' />
        <div className='flex flex-col h-full justify-between whitespace-nowrap overflow-hidden text-ellipsis'>
            <div className='w-full'>
                <h2 className='text-richblack-5 whitespace-nowrap overflow-hidden text-ellipsis hover:underline cursor-pointer' onClick={() => navigate(`/view-course/${course.courseId._id}/${course.courseId.sections[0]._id}/${course.courseId.sections[0].videos[0]._id}`)}>
                    {course.courseId.name}
                </h2>
                <h4 className='text-xs text-richblack-400'>By Prof. {course.courseId.instructor.firstName} {course.courseId.instructor.lastName}</h4>
            </div>
            <div className='mt-1 space-y-1 lg:space-y-2 w-full'>
                <p className='text-[#838894] text-xs text-ellipsis whitespace-nowrap overflow-hidden'>{course.courseId.description}</p>
                <p className='py-1 px-2 bg-richblack-700 rounded-full text-xs w-fit font-semibold hover:underline cursor-pointer' style={{color: `#${course.courseId.category.color}`}} onClick={() => navigate(`/catalog/${course.courseId.category._id}`)}>{course.courseId.category.title}</p>
                <div className='lg:hidden flex-col justify-center'>
                    <p className='text-richblack-5 text-xs my-1'>Progress {Math.round(course.completedVideos.length / totalCourseLectures(course.courseId) * 100)}%</p>
                    <ProgressBar completed={course.completedVideos.length} maxCompleted={totalCourseLectures(course.courseId)} height='5px' bgColor='#47A5C5' isLabelVisible={false} />
                    <div className='lg-:hidden flex justify-between items-center mt-2 '>
                        <p className='text-sm text-richblack-100'><i className="ri-time-fill"></i> {formatDuration(totalCourseDuration(course.courseId))}</p>
                        <p className='text-sm lg:hidden text-yellow-50 underline' onClick={() => navigate(`/view-course/${course.courseId._id}/${course.courseId.sections[0]._id}/${course.courseId.sections[0].videos[0]._id}`)}>Go To Course</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div className='hidden lg:flex flex-col justify-center text-richblack-5 text-xs w-[15%] text-center font-bold'>
        {formatDuration(totalCourseDuration(course.courseId))}
    </div>
    <div className='hidden lg:flex flex-col justify-center w-[20%]'>
        <p className='text-richblack-5 text-xs my-1'>Progress {Math.round(course.completedVideos.length / totalCourseLectures(course.courseId) * 100)}%</p>
        <ProgressBar completed={course.completedVideos.length} maxCompleted={totalCourseLectures(course.courseId)} height='5px' bgColor='#47A5C5' isLabelVisible={false} />
    </div>
    <div className='hidden text-3xl w-[10%] lg:grid place-content-center text-richblack-5 relative group'>
        <i className="ri-more-2-fill relative translate-x-1 cursor-pointer"></i>
        <div className='invisible group-hover:visible absolute text-sm -translate-x-[50%] translate-y-full py-1 rounded bg-richblack-700 w-max z-20'>
            <p className='px-2 py-1'><i className="ri-check-double-line"></i> Mark as Complete</p>
            <p className='px-2 py-1'><i className="ri-delete-bin-6-line"></i> Remove</p>
        </div>
    </div>
</div>
                ))
            }
            </div>
        </div>
        </div>
        
    )
  )
}

export default RegisteredCourses
