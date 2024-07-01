import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getRegisteredCourses } from '../services/operations/profileAPI';
import Spinner from '../components/common/Spinner';
import ProgressBar from "@ramonak/react-progress-bar";
import { useNavigate } from 'react-router';
import { formatDuration, totalCourseDuration } from './../utils/totalDuration';

const RegisteredCourses = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const {loading} = useSelector(state => state.profile);
    const {token} = useSelector(state => state.auth)

    const [registeredCourses, setRegisteredCourses] = useState(null)

    const fetchRegisteredCourses = async () => {
         const response = await getRegisteredCourses(dispatch, token);
         setRegisteredCourses(response);
    }

    useEffect(()=> {
        fetchRegisteredCourses();

        console.log("Registered Courses Array :",registeredCourses)
    }, [])
  return (
    (loading || !registeredCourses)
    ?
    <Spinner/>
    :
    (registeredCourses.length === 0
        ?
        <div className='min-h-[calc(100vh-3.5rem)] grid place-content-center text-center'>
            <h1 className='text-white text-3xl font-semibold py-2'>No Courses Registered</h1>
            <p className='text-[#AFB2BF] font-semibold'>You have no purchased courses yet. Add to wishlist to start your learning jouney now</p>
        </div>
        :
        <div className='pt-7'>
<div className='min-h-[calc(100vh-3.5rem)] w-11/12 mx-auto font-inter'>
            <div className='rounded w-full border border-richblack-500'>
                <div className='flex px-2 py-3 bg-[#2C333F] text-white uppercase text-sm font-semibold'>
                    <p className='w-[55%]'>Course Name</p>
                    <p className='w-[15%] text-center'>Durations</p>
                    <p className='w-[20%] text-center'>Progress</p>
                    <p className='w-[10%] text-center'>Options</p>
                </div>
            {
                registeredCourses.map( (course) => (
                    <div key={course._id} className='px-3 py-4 flex border-b border-richblack-500'>
                        <div className='w-[55%] flex gap-3'>
                        <img src={course.thumbnail} alt="" className='aspect-[5/3] h-28 object-cover rounded' />
                        <div className='flex flex-col h-full justify-between'>
                            <div>

                            <h2 className='text-white text-ellipsis'>{course.name}</h2>
                            <h4 className='text-xs text-richblack-400'>By Prof. {course.instructor.firstName} {course.instructor.lastName}</h4>
                            </div>
                            <p className='py-1 px-2 bg-richblack-700 rounded-full text-xs w-fit font-semibold hover:underline cursor-pointer' style={{color: `#${course.category.color}`}} onClick={() => navigate(`/catalog/${course.category._id}`)}>{course.category.title}</p>
                            <p className='text-[#838894] text-sm text-ellipsis'>{course.description}</p>
                        </div>
                        </div>
                        <div className='flex flex-col justify-center text-white text-xs w-[15%] text-center font-bold'>
                        {formatDuration(totalCourseDuration(course))}
                        </div>
                        <div className='flex flex-col justify-center w-[20%]'>
                            <p className='text-white text-xs my-1'>Progress 65%</p>
                            <ProgressBar completed={65} height='5px' bgColor='#47A5C5' isLabelVisible={false}/>
                        </div>
                        <div className='text-3xl w-[10%] grid place-content-center text-white relative group'>
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
