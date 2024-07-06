import React from 'react'
import { Link } from 'react-router-dom'

const Button = ({text, bgColor, textColor, action, isArrow}) => {
  return (
    <Link to={action}>
    <div className={`${bgColor} w-fit rounded md:rounded-md px-3 py-2 md:px-4 md:py-3 ${textColor} text-sm md:text-md text-center font-semibold hover:scale-95 transition-all duration-100`}>
      {text} {(isArrow) ? <i className="ri-arrow-right-line"></i> : ""}
    </div>
    </Link>
  )
}

export default Button
