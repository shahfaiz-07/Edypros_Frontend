import React, { useEffect, useState } from 'react'
import { getInstructorCourses } from '../services/operations/courseAPI';
import { useDispatch, useSelector } from 'react-redux';

const MyCourses = () => {
    const dispatch = useDispatch();
    const {token} = useSelector(state => state.auth)
    const {laoding} = useSelector(state => state.profile)
    const [couses, setCourses] = useState();


    const fetchInstructorCourses = async() => {
        setCourses(await getInstructoCourses(dispatch, token))
    }

    useEffect( () => {
        fetchInstructorCourses()
    }, [])
  return (
    <div className="">
      
    </div>
  )
}

export default MyCourses
