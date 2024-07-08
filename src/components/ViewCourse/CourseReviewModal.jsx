import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReactStars from "react-stars";
import { useForm } from 'react-hook-form';
import { addRatingAndReview, editRatingAndReview } from "../../services/operations/studentAPI";
import { useParams } from "react-router";
import toast from "react-hot-toast";

const CourseReviewModal = ({ setModalData }) => {
	const {token} = useSelector(state => state.auth)
	const { user } = useSelector((state) => state.profile);
	const { ratingAndReview } = useSelector(state => state.viewCourse)
	const [initialRating, setInitialRating] = useState(0)
	const [localLoading, setLocalLoading] = useState(false)
  const { courseId } = useParams()
  const dispatch = useDispatch()
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
  } = useForm({
    defaultValues: {
      userRating: 0,
      userReview: ""
    }
  });

  useEffect( () => {
    if(ratingAndReview) {
      setValue("userRating", ratingAndReview.rating)
      setValue("userReview", ratingAndReview.review)
      setInitialRating(ratingAndReview.rating)
    }
  }, [ratingAndReview])
  const ratingChanged = (newRating) => {
    setValue("userRating", newRating)
  }
	const onSubmit = async () => {
    const currentValues = getValues()
    if(!ratingAndReview) {
		setLocalLoading(true)
		await addRatingAndReview(dispatch, {rating: currentValues.userRating, review: currentValues.userReview, reviewed: courseId}, token)
		setLocalLoading(false)
      setModalData(false)
    } else if(Number(ratingAndReview.rating) !== Number(currentValues.userRating) || ratingAndReview.review !== currentValues.userReview) {
		setLocalLoading(true)
		await editRatingAndReview(dispatch, {rating: currentValues.userRating, review: currentValues.userReview, courseId}, token)
		setLocalLoading(false)
      setModalData(false)
    } else {
      toast.error("No Changes Made !!")
      setModalData(false)
    }
  };
	return (
		<div
			className="w-[100vw] h-[100vh] bg-richblack-400 bg-opacity-50 fixed z-50 grid place-content-center top-0 left-0"
			onClick={() => setModalData(false)}
			disabled={localLoading}
		>
			<div
				className="rounded-lg max-w-[650px] lg:w-[650px] bg-richblack-800 overflow-hidden"
				onClick={(e) => e.stopPropagation()}
			>
				<div className="bg-richblack-700 flex items-center justify-between py-2 px-4 text-white">
					<h1>{ratingAndReview ? "Edit You Review" :"Leave A Review"}</h1>
					<span onClick={() => setModalData(false)} disabled={localLoading}>
						<i className="ri-close-large-line"></i>
					</span>
				</div>
				<div className="flex justify-center mt-3">
					<div className="flex gap-x-3">
						<img
							src={user.avatar}
							alt=""
							className="aspect-square object-cover w-14 h-14 rounded-full"
						/>
						<div className="flex flex-col justify-between text-richblack-5 py-1">
							<h3 className="text-lg font-semibold">
								{user.firstName} {user.lastName}
							</h3>
							<p className="text-richblack-100">Posting Publicly</p>
						</div>
					</div>
				</div>
        <form onSubmit={handleSubmit(onSubmit)}>
				<div className="flex flex-col items-center">
					<ReactStars
						count={5}
						onChange={ratingChanged}
            value={initialRating}
						size={24}
						edit={!localLoading}
						color2={"#ffd700"}
					/>
          <input className="hidden" value={getValues().userRating} {...register("userRating", {required: true, validate: value => value > 0})} type="number" disabled/>{errors.userRating && <span className='text-pink-200 text-[11px]'>* Please provide your rating</span>}
				</div>
				<div className="flex flex-col gap-y-2 py-3 px-4">
					<p className="text-richblack-25 text-md">Add Your Experience</p>
					<textarea
						name=""
						id=""
						cols="30"
						rows="5"
						className="form-style no-scrollbar"
						placeholder="Share Your Experience..."
						disabled={localLoading}
            {...register("userReview", {required: true})}
					></textarea>
          {errors.userReview && <span className='text-pink-200 text-[11px]'>* Please provide a review</span>}
					<div className="flex justify-end gap-x-4 font-semibold">
						<button
							className="bg-richblack-600 px-4 py-2 rounded"
							onClick={() => {
                setModalData(false)}}
				disabled={localLoading}
						>
							Cancel
						</button>
						<button
							className="bg-yellow-50 rounded px-4 py-2"
							type="submit"
							disabled={localLoading}
						>
							{ratingAndReview ? "Save" : "Post"}
						</button>
					</div>
				</div>
        
        </form>
			</div>
		</div>
	);
};

export default CourseReviewModal;
