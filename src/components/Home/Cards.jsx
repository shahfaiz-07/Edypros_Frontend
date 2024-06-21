import React from 'react' 
const Cards = ({data, activeCard, setActiveCard}) => {
  return (
    <div onClick={() => setActiveCard(data.heading)} className={`flex flex-col min-w-72 w-[70%] md:w-72 h-[17rem] justify-between pt-7 pb-4 ${(activeCard === data.heading)? "bg-white transition-all duration-200 shadow-[10px_10px_0_0_#FFD60A] -translate-x-[5px] -translate-y-[5px]" : "bg-[#161D29] cursor-pointer"} `}>
        <h1 className={`font-bold text-lg px-5 ${(activeCard === data.heading)?"" : "text-white"}`}>{data.heading}</h1>
      <p className={`text-sm ${(activeCard === data.heading) ? "text-[#585D69]" : "text-[#6E727F]"} px-5`}>{data.description}</p>
      
      <div className={`flex font-semibold justify-between ${(activeCard === data.heading)?"text-[#0A5A72]":"text-[#838894]"} mt-9 border-t border-dashed px-5 pt-3 text-sm`}>
        <div className='flex gap-2'>
        <i className="ri-group-fill"></i>
        <p>{data.level}</p>
        </div>
        <div className='flex gap-2'>
        <i className="ri-book-shelf-line"></i>
        <p>{data.lessonNumber}</p>
        </div>
      </div>
    </div>
  )
}

export default Cards
