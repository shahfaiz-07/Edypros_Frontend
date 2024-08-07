import React from 'react'
import { totalCourseLectures } from '../../utils/totalCourseLectures'
import { totalCourseDuration } from '../../utils/totalDuration'
import { formatDuration } from './../../utils/totalDuration';

const CourseContent = ({course}) => {
    const totalLectures = totalCourseLectures(course)
    // console.log(duration)
  return (
    <div className='py-2 md:py-4 space-y-1'>
      <h1 className='text-richblack-5 font-semibold text-2xl md:text-3xl'>Course Content</h1>
      <div className='flex flex-col sm:flex-row gap-x-3 px-2 pb-3 text-richblack-25 text-sm'>
        <p className=''>{course.sections.length} sections(s) | {totalLectures} lecture(s)</p>
        {" "}<span className='font-bold hidden sm:block'>|</span>{" "}
        <p className='font-semibold'><i className="ri-time-fill font-light"></i> Course Duration : {formatDuration(totalCourseDuration(course))}</p>

      </div>
      <div className='border-t border-richblack-600'>
        {
            course.sections.map( (section) => (
                <details key={section._id} className='border border-richblack-600 border-t-0'>
                    <summary className='text-richblack-5 bg-richblack-800 flex items-center justify-between px-3 py-2 md:px-6 md:py-4 text-sm md:text-base lg:text-lg cursor-pointer gap-x-3'>
                        <div className='flex gap-x-3 items-center'>
                        <i className="ri-arrow-down-s-fill md:text-lg"></i> 
                        <h4>{section.name}</h4>
                        </div>
                        <p className='text-xs md:text-sm lg:text-base whitespace-nowrap text-yellow-50'>{section.videos.length} lecture(s)</p>
                    </summary>
                    {
                        section.videos.map( video => (
                            <div key={video._id} className='text-richblack-5 px-3 md:px-5 py-2 bg-richblack-900 flex gap-x-2 justify-between text-sm md:text-base'>
                                <p><i className="ri-vidicon-line"></i>{" "}{video.title}</p>
                                <p className='whitespace-nowrap'><i className="ri-time-fill font-light"></i>{" "}{formatDuration(Number(video.duration))}</p>
                            </div>
                        ))
                    }
                </details>
            ))
        }
      </div>
    </div>
  )
}

export default CourseContent
