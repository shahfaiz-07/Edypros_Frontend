import React from 'react'
import { Link } from 'react-router-dom'

const EditButton = () => {
  return (
    <Link to="/dashboard/settings" className='px-3 py-2 bg-yellow-50 w-fit rounded text-black text-sm font-semibold cursor-pointer'>
      <i className="ri-edit-box-line"></i> Edit
    </Link>
  )
}

export default EditButton
