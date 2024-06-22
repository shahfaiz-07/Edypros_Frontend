import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Spinner from '../components/common/Spinner'
import { Link } from 'react-router-dom';
import { getPasswordResetToken } from '../services/operations/authAPI';

const ResetPassword = () => {
    const {loading} = useSelector((state) => state.auth)
    const [emailSent, setEmailSent] = useState(false)
    const [email, setEmail] = useState("")

    const dispatch = useDispatch()

    const handleOnSubmit = (e) => {
        e.preventDefault();
        dispatch(getPasswordResetToken(email, setEmailSent))
    }
  return (
    <div className='grid min-h-[calc(100vh-3.5rem)] place-items-center'>
      {
        loading
        ?
        (<Spinner/>)
        :
        (<div className='flex max-w-96 flex-col px-3'>
            <h1 className='text-white text-2xl self-start'>
                {
                    emailSent ? "Check Your Email" : "Reset Password"
                }
            </h1>
            <p className='text-[#AFB2BF] text-sm my-5'>
                {
                    !emailSent 
                    ? "Have no fear. We'll email you instructions to reset your password. If you dont have access to your email we can try account recovery"
                    :
                    `We have sent the reset email to ${email}`
                }
            </p>
            <form className='flex flex-col w-full gap-10'>
                {
                    !emailSent 
                    ?
                    <label className='w-full'>
                        <p className='text-[#F1F2FF] text-sm'>Email Address <sup className="text-pink-200">*</sup></p>
                        <input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Enter Your Email Address...'
                        className='text-white bg-richblack-800 mt-2 px-4 py-3 rounded text-sm w-full'/>
                    </label>
                    :
                    ""
                }
                {
                    <button className='text-black text-sm bg-yellow-50 py-3 rounded-md font-semibold mb-3 md:mb-5' onClick={handleOnSubmit}>
                        {
                            !emailSent 
                            ?
                            "Reset Password"
                            :
                            "Resend Email"
                        }
                    </button>
                }
            </form>
            <div className='text-white text-xs'>
                <Link to="/login">
                <i className="ri-arrow-left-line"></i> <span>Back to Login</span>
                </Link>
            </div>
        </div>)
      }
    </div>
  )
}

export default ResetPassword
