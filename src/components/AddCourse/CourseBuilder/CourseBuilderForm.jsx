import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { setEditCourse, setStep } from '../../../features/courses/courseSlice';
import toast from 'react-hot-toast';
import NestedView from './NestedView';
import { createSection, editSection } from '../../../services/operations/courseAPI';

const CourseBuilderForm = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: {errors}
  } = useForm()
  const {course} = useSelector(state => state.course)
  const {token} = useSelector(state => state.auth)

  const dispatch = useDispatch()

  const [editSectionName, setEditSectionName] = useState(null)

  const onSubmit = async (data) => {
    // const toastId = toast.loading("Loading...");
    if(editSectionName) {
      const result = await editSection(dispatch, data.sectionName, editSectionName, token)
      console.log("EDIT SECTION RESULT =>>", result)
    } else {
      const result = await createSection(dispatch, data.sectionName, course._id, token);
      console.log("RESULT =>>", result)
    }
    setValue("sectionName", "")
    // toast.dismiss(toastId)
  }

  const handleEditSectionName = (sectionId, sectionName) => {
    if(editSectionName === sectionId) {
      setEditSectionName(null);
      setValue("sectionName", "");
    } else {
      setEditSectionName(sectionId);
      setValue("sectionName", sectionName)
    }
  }
  return (
    <div className="space-y-8 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6">
      <p className="text-2xl font-semibold text-richblack-5">Course Builder</p>
      <form 
      onSubmit={handleSubmit(onSubmit)} 
      className="space-y-4">
        <label className="text-sm text-richblack-5" htmlFor="sectionName">
          Section Name<sup className="text-pink-200">*</sup>
        </label>
        <input
          id="sectionName"
          placeholder="Add a section to build your course"
          name="sectionName"
          className="form-style w-full"
          {...register("sectionName", { required: true })}
        />
        {errors.sectionName && (
          <p className="ml-2 text-xs tracking-wide text-pink-200">This field is required</p>
        )}
        <div className="flex items-end gap-x-4">
          <button
            type="submit"
            className="flex items-center border border-yellow-50 bg-transparent cursor-pointer gap-x-2 rounded-md py-2 px-5 font-semibold text-richblack-900 undefined"
          >
            <span className="text-yellow-50">
              {editSectionName ? "Edit Section Name" : "Create Section"}
            </span>
            <i className="ri-add-circle-line text-[20px] text-yellow-50 font-light"></i>
          </button>
          {editSectionName && (
            <button
              onClick={() => {
                setEditSectionName(null);
                setValue("sectionName", "");
              }}
              type="button"
              className="text-sm text-richblack-300 underline"
            >
              Cancel Edit
            </button>
          )}
        </div>
      </form>
      {course.sections.length > 0 && <NestedView handleEditSectionName={handleEditSectionName} />}
      <div className="flex justify-end gap-x-3">
        <button
          onClick={() => {
            dispatch(setEditCourse(true));
            dispatch(setStep(1));
          }}
          className="flex cursor-pointer items-center gap-x-2 rounded-md bg-richblack-300 py-[8px] px-[20px] font-semibold text-richblack-900"
        >
          Back
        </button>
        <button
          onClick={() => {
            if(course.sections.length === 0) {
              toast.error("Add atleast 1 section")
            }
            if(course.sections.some(section => section.video.length === 0)) {
              toast.error("Add atleast 1 video in each section")
            }
          }}
          className="flex items-center bg-yellow-50 cursor-pointer gap-x-2 rounded-md py-2 px-5 font-semibold text-richblack-900 undefined"
        >
          <span className="false">Next</span>
          <svg
            stroke="currentColor"
            fill="currentColor"
            strokeWidth="0"
            viewBox="0 0 24 24"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path fill="none" d="M0 0h24v24H0z"></path>
            <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"></path>
          </svg>
        </button>
      </div>
    </div>
  )
}

export default CourseBuilderForm
