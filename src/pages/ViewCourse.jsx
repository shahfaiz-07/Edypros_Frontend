import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { getCourseDetails } from '../services/operations/studentAPI';
import Spinner from './../components/common/Spinner';
import VideoSection from '../components/ViewCourse/VideoSection';
import ViewCourseSidebar from './../components/ViewCourse/ViewCourseSidebar';
import { resetViewCourse, setCompletedLectures, setCourseData, setCurrentSection, setCurrentVideo, setDuration, setRatingsAndReviews, setTotalLectures } from '../features/registeredCourses/viewCourseSlice';
import { totalCourseLectures } from '../utils/totalCourseLectures';
import { formatDuration, totalCourseDuration } from '../utils/totalDuration';
import logo from "../assets/Logo/logo-no-background.svg";
import useOnClickOutside from '../hooks/useOnClickOutside';
import toast from 'react-hot-toast';
const ViewCourse = () => {
  const {token} = useSelector(state => state.auth)
  const {loading} = useSelector(state => state.profile)
  const {courseData} = useSelector(state => state.viewCourse)
  const dispatch = useDispatch();
  const { courseId, sectionId, videoId } = useParams();
  const [openMenu, setOpenMenu] = useState(false)
  const ref = useRef(null)
  useEffect( () => {
    const fetchCourseDetails = async() => {
      const response = await getCourseDetails(dispatch, courseId, token)
      dispatch(setCourseData(response.course));
      const currentSection = response.course.sections.filter( (section) => section._id === sectionId);
      dispatch(setCurrentSection(currentSection[0]));
      const currentVideo = currentSection[0].videos.filter( (video) => video._id === videoId);
      dispatch(setCurrentVideo(currentVideo[0]))
      dispatch(setRatingsAndReviews(response.ratingAndReview));
      dispatch(setTotalLectures(totalCourseLectures(response.course)))
      dispatch(setDuration(formatDuration(totalCourseDuration(response.course))))
      dispatch(setCompletedLectures(response.courseProgress.completedVideos))
    }
    fetchCourseDetails()
  }, [])

  useOnClickOutside(ref, () => setOpenMenu(false))
  return (
    (loading || !courseData)
    ?
    <Spinner/>
    :
    <div>
      <div className='flex gap-x-2 justify-between px-5 py-1 items-center border-b border-richblack-500'>
        <img src={logo} className='h-9 pr-5 border-r border-richblack-500 hidden md:block' alt="" />
      <h1 className=' text-richblack-5 text-xl md:text-2xl py-3 text-center '>{courseData.name}</h1>
      <button className='px-2 py-1 border text-white text-md' onClick={ () => {
				window.navigator.clipboard.writeText(`course/${courseId}`)
				toast.success("Link copied to clipboard")
			}}>Share <i className="ri-share-forward-fill"></i></button>
      </div>
      <div className='w-11/12 mx-auto py-2 lg:hidden'>
      <button className='px-2 py-1 rounded bg-yellow-50 font-bold' onClick={ () => setOpenMenu( (prev) => !prev)}>Course Sections</button>
      </div>
    <div className='flex lg:flex-row'>
      <div className={`absolute z-50 lg:static w-[90%] max-w-[600px] lg:max-w-maxContent lg:w-[25%] bg-richblack-800 bg-opacity-95 transition-all duration-300 ${ openMenu ? "" : "-translate-x-[150%] lg:translate-x-0"}`} ref={ref}>
        <ViewCourseSidebar/>
      </div>
      <div className='lg:w-[75%]'>
        <VideoSection/>
      </div>
    </div>
    </div>
  )
}

export default ViewCourse
