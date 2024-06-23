import React from 'react'
import { learnings } from '../../data/learning-grid'
import Button from './../buttons/Button';
const Learning = () => {
  return (
    <div className='grid  grid-col-1 lg:grid-cols-4 mb-10 p-5 lg:w-fit'>
    {
        learnings.map( (card, index) => {
            return (
                <div
                key={index}
                className={`${index === 0 && "lg:col-span-2 lg:h-[280px] p-5"}
                ${
                    card.order % 2 === 1 ? "bg-richblack-700 lg:h-[280px] p-5" : "bg-richblack-800 lg:h-[280px] p-5"
                }
                ${card.order === 3 && "lg:col-start-2"}
                ${card.order < 0 && "bg-transparent"}
                `}
                >
                {
                    card.order < 0 
                    ? (
                        <div className='lg:w-[90%] flex flex-col pb-5 gap-3'>
                            <div className='text-4xl font-semibold'>
                                {card.heading}
                                <span className='text-[#1FA2FF]'> {card.highlightText}</span>
                            </div>
                            <p className='font-medium'>
                                {card.description}
                            </p>
                            <div className='w-fit mt-4'>
                                <Button text="Learn More" bgColor={'bg-yellow-50'} textColor={'text-black'} action={'/'}/>
                            </div>
                        </div>
                    )
                    : (<div className='flex flex-col gap-8 p-7'>
                        <h1 className='text-richblack-5 text-lg'>
                            {card.heading}
                        </h1>
                        <p className='text-richblack-300 font-medium'>
                            {card.description}
                        </p>
                    </div>)
                }

                </div>
            )
        } )
    } 
    </div>
  )
}

export default Learning
