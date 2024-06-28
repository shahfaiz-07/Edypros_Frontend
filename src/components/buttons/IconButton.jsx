import React from 'react'

const IconButton = ({text, textColor, bgColor, icon, action}) => {
  return (
    <button className={`${bgColor} w-fit rounded-md px-3 py-1 ${textColor} text-center font-semibold hover:scale-95 transition-all duration-100 text-sm`} onClick = {action}>
    {text} <i className={icon}></i>
    </button>
  )
}

export default IconButton
