import React, { useState } from 'react'
import { HomePageExplore as explore } from '../../data/homepage-explore'
import Cards from './Cards';
const UnlockSection = () => {
    const tags = ['Free', 'New to coding', 'Most popular', 'Skills paths', 'Career paths']
    const [currentTag, setCurrentTag] = useState(tags[0]);
    const [currentData, setCurrentData] = useState(explore[0].courses)
    const [activeCard, setActiveCard] = useState(explore[0].courses[0].heading)
    const changeCards = (val) => {
        setCurrentTag(val);
        const result = explore.filter( (elem) => elem.tag === val);
        setCurrentData(result[0].courses)
        setActiveCard(result[0].courses[0].heading)
    }
  return (
    <div className='flex flex-col items-center'>
      <div className='text-center'>
        <h2 className='text-white font-inter text-2xl md:text-3xl font-semibold'>Unlock the <span className='text-[#1FA2FF]'>Power of Code</span></h2>
        <p className='text-[#838894] text-sm mt-2 md:mt-5'>Learn to Build Anything You Can Imagine</p>
      </div>
      <div className='w-[95vw] overflow-x-scroll no-scrollbar scroll-m-0 rounded-full mt-5 mb-10 md:my-10 mx-auto'>
      <div className='mx-auto flex flex-row gap-2 bg-richblack-800 rounded-full p-1 min-w-max w-fit'>
        {
            tags.map( (elem, index) => (
                <div key = {index} className={`rounded-full py-2 px-5 text-sm
                ${(currentTag === elem) 
                    ? "text-richblack-5 bg-richblack-900"
                    : "text-richblack-500 cursor-pointer hover:text-richblack-5 transition-all duration-100"
                }
                `}
                onClick={() => changeCards(elem)}>
                    <p>{elem}</p>
                </div>
            ))
        }
      </div>
      </div>
      
      <div className='relative -mb-20 flex flex-wrap items-center justify-center gap-10 mx-auto'>
        {currentData.map( (data, index) => (
            <div key={index} className='flex justify-center'>
                <Cards data={data} activeCard={activeCard} setActiveCard={setActiveCard}/>
            </div>
        ))}
      </div>
    </div>
  )
}

export default UnlockSection
