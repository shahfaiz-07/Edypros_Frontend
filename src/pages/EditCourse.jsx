import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useParams } from 'react-router'
import { setEditCourse, setStep } from '../features/courses/courseSlice';
import { getEditableCourseData } from '../services/operations/courseAPI';
import Spinner from '../components/common/Spinner';
import RenderSteps from '../components/AddCourse/RenderSteps';

const EditCourse = () => {
    const {courseId} = useParams();
    const {loading} = useSelector(state => state.profile);
    const {token} = useSelector(state => state.auth)
    const dispatch = useDispatch()

    // if(!user.registeredCourses.includes(courseId)) {
    //     console.log(user.registeredCourses)
    //     console.log(courseId)
    //     return (
    //         <Navigate to={"/dashboard/my-profile"}/>
    //     )
    // }

    useEffect( () => {
        const fetchEditableCourseData = async() => {
          dispatch(setEditCourse(true));
          dispatch(setStep(1));
            await getEditableCourseData(dispatch, courseId, token)
        }
        fetchEditableCourseData()
    }, [])
    
  return (
    loading
    ?
    <Spinner/>
    :
    <div className='mx-auto w-11/12 max-w-[1000px] py-10'>
      <div className='flex flex-1 flex-col'>
            <h1 className='mb-14 text-3xl font-medium text-richblack-5'>Edit Course</h1>
            <RenderSteps/>
    </div>
    </div>
  )
}

export default EditCourse
