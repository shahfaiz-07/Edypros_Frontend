import React from 'react'
import './style.css'
const VerifyPaymentOverlay = () => {
  return (
    <div className='w-[100vw] h-[100vh] top-0 left-0 bg-richblack-5 bg-opacity-70 grid place-content-center fixed z-[999]'>
      <div className="loader"></div>
    </div>
  )
}

export default VerifyPaymentOverlay
