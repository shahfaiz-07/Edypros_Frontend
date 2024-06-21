import React from 'react'
import img from '../../assets/Images/Instructor.png'
import Button from '../buttons/Button'
const BecomeInstructor = () => {
  return (
    <div className='mt-16'>
      <div className='flex flex-col md:flex-row gap-20 items-center'>

        <div className='w-[50%]'>
            <img
                src={img}
                alt=""
                className='shadow-white shadow-[-1.3rem_-1rem_0_0]'
            />
        </div>

        <div className='md:w-[50%] flex flex-col gap-10'>
            <div className='text-4xl font-semibold md:w-[50%] text-white'>
                Become an <span className='text-[#1FA2FF]'>Instructor</span>
            </div>

            <p className='font-medium text-[16px] w-[80%] text-richblack-300'>
            Instructors from around the world teach millions of students on Edypros. We provide the tools and skills to teach what you love.
            </p>

            <div className='w-fit mt-15'>
                <Button text={'Start Teaching Today'} isArrow={true} bgColor={'bg-yellow-50'}/>
            </div>


        </div>

      </div>
    </div>
  )
}

export default BecomeInstructor
