import React from 'react'

const WishlistTotal = ({wishlist, totalPrice}) => {
  return (
    <div className='p-4 flex flex-col gap-y-1 w-full rounded-md bg-richblack-800 border border-richblack-600'>
      <p className='text-sm text-richblack-200'>Total :</p>
      <p className='text-[#ffd700]'>Rs. {totalPrice}</p>
      <ul className='text-xs text-richblack-400'>
        {
            wishlist.map( (item, index) => (
                <li>{item.name} : Rs. {item.price}</li>
            ))
        }
      </ul>
      <div className='py-2 rounded text-center bg-yellow-50 w-full mt-2 font-semibold'>Book Now</div>
    </div>
  )
}

export default WishlistTotal
