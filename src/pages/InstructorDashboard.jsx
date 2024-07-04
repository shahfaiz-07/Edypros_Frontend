import React, { useEffect, useState } from 'react'
import { getInstructorDashboardData } from '../services/operations/profileAPI';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from '../components/common/Spinner';
import { Link } from 'react-router-dom';
import CourseItem from '../components/InstructorDashboard/CourseItem';
import InstructorChart from '../components/InstructorDashboard/InstructorChart';

const InstructorDashboard = () => {
    const [dashboardData, setDashboardData] = useState({
        publishedCourses : [],
        draftCourses : []
    });
    const [totalRevenue, setTotalRevenue] = useState(0)
    const [totalStudents, setTotalStudents] = useState(0)
    const dispatch = useDispatch()
    const { token } = useSelector(state => state.auth)
    const { loading } = useSelector(state => state.profile)

    const fetchInstructorDashboardData = async () => {
        const response = await getInstructorDashboardData(dispatch, token)
        setDashboardData(response)
        let revenue = 0
        revenue = response.publishedCourses.reduce( (acc, course) => acc + course.courseRevenue, 0);
        setTotalRevenue(revenue)
        const students = response.publishedCourses.reduce( (acc, course) => acc + course.studentsEnrolled, 0 )
        setTotalStudents(students)
    }
    useEffect( () => {
        fetchInstructorDashboardData()
        console.log(dashboardData)
    }, [])
  return (
    loading
    ?
    <Spinner/>
    :
    dashboardData.publishedCourses.length !== 0 || dashboardData.draftCourses.length !== 0
    ?
    <div className='md:w-11/12 mx-auto my-5 font-inter'>
      <h1 className='text-3xl font-medium text-richblack-5'>Instructor Dashboard</h1>
      <div className='flex flex-col md:flex-row border-4 border-richblack-800'>
        <div className='md:w-[60%]'>
            <InstructorChart courses={dashboardData.publishedCourses}/>
        </div>
        <div className='md:w-[40%] bg-richblack-800 flex flex-col gap-y-3 py-4 px-5'>
            <h2 className='text-xl font-semibold text-richblack-5'>Statistics</h2>
            <div>
            <h3 className='text-richblack-300 font-semibold'>Published Courses</h3>
            <p className='text-richblack-25 text-xl font-bold'>{dashboardData.publishedCourses.length}</p>
            </div>
            <div>
            <h3 className='text-richblack-300 font-semibold'>Drafted Courses</h3>
            <p className='text-richblack-25 text-xl font-bold'>{dashboardData.draftCourses.length}</p>
            </div>
            <div>
            <h3 className='text-richblack-300 font-semibold'>Total Revenue</h3>
            <p className='text-richblack-25 text-xl font-bold'>Rs. {totalRevenue}</p>
            </div>
            <div>
            <h3 className='text-richblack-300 font-semibold'>Total Enrolled Students</h3>
            <p className='text-richblack-25 text-xl font-bold'>{totalStudents}</p>
            </div>
        </div>
      </div>
      <div className='bg-richblack-800 p-2 md:py-4 md:px-5'>
        <div className='flex justify-between items-center'>
            <h2 className='font-semibold text-richblack-5 text-lg'>Your Courses</h2>
            <Link to="/dashboard/my-courses" className='text-yellow-50 font-semibold text-md hover:underline'>
                View All
            </Link>
        </div>
        <div className='flex flex-col md:flex-row justify-between gap-2'>
            {
                dashboardData.publishedCourses.slice(0, 3).map( course => (
                    <CourseItem key={course._id} course={course}/>
                ))
            }
        </div>
      </div>
    </div>
    :
    <div className='min-h-[calc(100vh-3.5rem)] grid place-content-center text-center'>
        <h1 className="text-white text-3xl font-semibold py-2">
				No Courses Created Yet
			</h1>
			<p className="text-[#AFB2BF] font-semibold">
				You Have Not Created Any Courses Yet. Create a new Course to start your Instructor Journey Now.
		</p>
        <Link to="/dashboard/add-course" className='px-3 py-2 bg-yellow-50 w-fit font-bold rounded mx-auto mt-5'>
            Add Course <i className="ri-add-circle-line"></i>
        </Link>
    </div>
  )
}

export default InstructorDashboard
