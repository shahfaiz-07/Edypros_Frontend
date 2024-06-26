import React from 'react'

const ActionButton = ({text, bgColor, textColor, action, type}) => {
  return (
    <div onClick={action} type={type} className={`${bgColor} w-fit rounded-md px-4 py-2 ${textColor} text-center font-semibold hover:scale-95 transition-all duration-100 cursor-pointer`}>
      {text}
    </div>
  )
}

export default ActionButton
