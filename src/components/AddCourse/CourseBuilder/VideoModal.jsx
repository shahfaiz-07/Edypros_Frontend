import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import Upload from './Upload';
import { createVideo, updateVideoDetails, updateVideoFile } from './../../../services/operations/courseAPI';
import { useDispatch, useSelector } from 'react-redux';

const VideoModal = ({modalData, setModalData, add, view, edit}) => {
    const {
        register,
        handleSubmit,
        setValue,
        formState: {errors},
        getValues
    } = useForm();
    useEffect (() => {
        if (view || edit) {
            setValue("videoTitle", modalData.title);
            setValue("videoDescription", modalData.description);
            setValue("videoUrl", modalData.url);
        }
    },[view,edit]);

    const dispatch = useDispatch()
    const {token} = useSelector(state => state.auth)
    const [localLoading, setLocalLoading] = useState(false)

    const isFormUpdated = () => {
        const currentValues = getValues();
        if(currentValues.videoTitle !== modalData.title || currentValues.videoDescription !== modalData.description || currentValues.videoUrl !== modalData.url) {
            return true;
        }
        return false
    }
    

    const onSubmit = async(data) => {
        if(view) {
            return;
        } else if(edit) {
            if(!isFormUpdated) {
                toast.error("No changes made !!");
                return;
            } else {
                const currentValues = getValues();

                if(currentValues.videoTitle !== modalData.title || currentValues.videoDescription !== modalData.description) {
                    setLocalLoading(true)
                    await updateVideoDetails(dispatch, {title: data.videoTitle, description: data.videoDescription}, modalData._id, token)
                    setLocalLoading(false)
                }

                if(currentValues.videoUrl !== modalData.url) {
                    const formData = new FormData();
                    formData.append("video", data.videoUrl);
                    formData.append("videoId", modalData._id)
                    setLocalLoading(true)
                    await updateVideoFile(dispatch, formData, token)
                    setLocalLoading(false)
                }
                setModalData(null)
            }
        } else {
            const formData = new FormData();
            formData.append("title", data.videoTitle)
            formData.append("description", data.videoDescription)
            formData.append("sectionId", modalData)
            formData.append("video", data.videoUrl)

            console.log(modalData, data)
            setLocalLoading(true)
            await createVideo(dispatch, formData, token)
            setLocalLoading(false)
            setModalData(null)
        }
    }
  return (
    <div className='fixed inset-0 z-[1000] !mt-0 grid h-screen w-screen place-items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm'>
    <div className='my-10 w-11/12 max-w-[700px] rounded-lg border border-richblack-400 bg-richblack-800'>
        <p className='text-white px-6 py-3 bg-richblack-600 flex justify-between rounded-t-lg'><span>{view && "Viewing"}{add && "Adding"}{edit && "Editing"} Lecture</span> <span><i className="ri-close-large-line text-richblack-300 hover:text-richblack-5 cursor-pointer" onClick={()=>setModalData(null)} disabled={localLoading}></i></span></p>
      <form className='space-y-8 p-6' onSubmit={handleSubmit(onSubmit)}>
        <Upload 
        name="videoUrl"
        localLoading={localLoading}
        label="Video File"
        register = {register}
        setValue={setValue}
        errors={errors}
        video
        viewData={view ? modalData.url : null}
        editData={edit ? modalData.url : null}
        />
      <div className='flex flex-col space-y-2'>
            <label className='text-sm text-richblack-5'  htmlFor='videoTitle'>Lecture Title<sup className='text-pink-200'>*</sup></label>
            <input
                id='videoTitle'
                disabled={view || localLoading}
                placeholder='Enter Course Title'
                {...register("videoTitle", {required:true})}
                className='form-style w-full'
            />
            {
                errors.videoTitle && (
                    <span className='ml-2 text-xs tracking-wide text-pink-200'>Lecture Title is Required**</span>
                )
            }
        </div>
        <div className='flex flex-col space-y-2'>
            <label className='text-sm text-richblack-5'  htmlFor='videoDescription'>Lecture Description<sup className='text-pink-200'>*</sup></label>
            <textarea
                disabled={view || localLoading}
                id='videoDescription'
                placeholder='Enter Lecture Description'
                {...register("videoDescription", {required:true})}
                className='form-style resize-x-none min-h-[130px] w-full no-scrollbar'
                />
            {
                errors.videoDescription && (<span className='ml-2 text-xs tracking-wide text-pink-200'>
                    Lecture Description is required**
                </span>)
            }
        </div>
        {
            (edit || add) && (
                <button type='submit' className='px-4 py-2 font-semibold rounded bg-yellow-50' disabled={localLoading}>
                    {edit && "Save Changes"}{add && "Save"}
                </button>
            )
        }
      </form>
    </div>
    </div>
  )
}

export default VideoModal
