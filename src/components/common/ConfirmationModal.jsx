import React from 'react'
import ActionButton from '../buttons/ActionButton'

const ConfirmationModal = ({modalData, setConfirmationModal}) => {
  return (
    <div>
        <div className='w-11/12 max-w-[350px] rounded-lg border border-richblack-400 bg-richblack-800 p-6 z-50 fixed left-[50%] top-[50%] -translate-x-1/2 -translate-y-1/2'>
            <p className='text-2xl font-semibold text-richblack-5'>
                {modalData.text1}
            </p>
            <p className='mt-3 mb-5 leading-6 text-richblack-200'>
                {modalData.text2}
            </p>
            <div className='flex items-center justify-between gap-x-4 w-full'>
                <div onClick={()=>setConfirmationModal(null)}>
                <ActionButton
                    action={modalData?.btn1Handler}
                    text={modalData?.btn1Text}
                    bgColor="bg-yellow-50"
                    />
                </div>
                <ActionButton
                    action={modalData?.btn2Handler}
                    text={modalData?.btn2Text}
                    bgColor="bg-richblack-200"
                    />  
            </div>
        </div>

        <div className='fixed inset-0 z-10 !mt-0 grid place-items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm over'></div>
      
    </div>
  )
}

export default ConfirmationModal
