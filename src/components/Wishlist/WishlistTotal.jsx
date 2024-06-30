import React, { useEffect, useState } from 'react'
import { buyCourses } from '../../services/operations/paymentAPI';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

const WishlistTotal = ({wishlist}) => {
  const {token} = useSelector( state => state.auth)
  const {user} = useSelector( state => state.profile)
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const [totalPrice, setTotalPrice] = useState(0);
  useEffect( () => {
    let price = 0;
    for(let course of wishlist) {
      price += course.price
    }
    setTotalPrice(price)
  }, [wishlist])

  const handleBuyAll = async () => {
    let courses = []
    for(let course of wishlist) {
      courses.push(course._id)
    }

    await buyCourses(courses, token, user, navigate, dispatch);
  }
  return (
    <div className='p-4 flex flex-col gap-y-1 w-full rounded-md bg-richblack-800 border border-richblack-600'>
      <p className='text text-richblack-200'>Total :</p>
      <p className='text-[#ffd700] text-xl'>Rs. {totalPrice}</p>
      <ul className='text-xs text-richblack-400'>
        {
            wishlist.map( (item, index) => (
                <li key={index}><i className="ri-corner-down-right-line"></i>{" "}{item.name} : <span className='font-semibold'>Rs. {item.price}</span></li>
            ))
        }
      </ul>
      <div className='py-2 rounded text-center bg-yellow-50 hover:bg-yellow-100 cursor-pointer w-full mt-2 font-bold' onClick={handleBuyAll}>Buy All</div>
    </div>
  )
}

export default WishlistTotal
