import React from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { buyCourses } from "../../services/operations/paymentAPI";
import { ACCOUNT_TYPE } from './../../constants';

const BuyNowCard = ({ course }) => {
    const {token} = useSelector(state => state.auth)
	const user = useSelector(state => state.profile)
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const {courseId} = useParams()
    const handleAddToWishlist = () => {
        if(!token) {
            toast("Login to add this course to wishlist", {
                icon: '❗'
            })
        } else if (user.accountType === ACCOUNT_TYPE.INSTRUCTOR) {
			toast("Instructor cannot add course to wishlist !")
		} else {

		}
    }

    const handleBuyNow = async () => {
        if(!token) {
            toast("Login to Purchase this Course", {
                icon: '❗'
            })
        } else if (user.accountType === ACCOUNT_TYPE.INSTRUCTOR) {
			toast("Instructor cannot purchase course !")
		} else {
			await buyCourses([courseId], token, user, navigate, dispatch)
		}
    }
	return (
		<div className=" md:relative md:-translate-y-1/4 md:rounded-lg md:bg-richblack-700 py-4 md:px-4 flex flex-col gap-y-2 mx-auto max-w-[30rem]">
			<img
				src={course.thumbnail}
				alt=""
				className="rounded aspect-video object-cover"
			/>
			<p className="text-richblack-5 font-semibold text-lg">
				Rs. {course.price}
			</p>
			<button className="bg-yellow-50 rounded w-full py-2 font-semibold" onClick={handleBuyNow}>
				Buy Now
			</button>
			<button className="bg-richblack-800 md:bg-richblack-900 rounded w-full py-2 font-semibold text-richblack-5" onClick={handleAddToWishlist}>
				Add to Wishlist
			</button>
			<div className="">
				<h3 className="text-richblack-25 font-semibold text-lg">
					Pre Requisites of this Course :
				</h3>
				<ul>
					{course.preRequisites.map((preRequisite, index) => (
						<li className="text-pink-300 text-sm" key={index}>
							<i className="ri-arrow-drop-right-fill"></i> {preRequisite}
						</li>
					))}
				</ul>
			</div>
			<div className="">
				<h3 className="text-richblack-25 font-semibold text-lg">
					Associated Tags :
				</h3>
                <div className="flex gap-1 py-1">
                    {
                        course.tags.map( (tag, index) => (
                            <p key={index} className="px-2 py-1 bg-yellow-500 text-richblack-5 text-xs rounded-full font-semibold">{tag}</p>
                        ))
                    }
                </div>
			</div>
		</div>
	);
};

export default BuyNowCard;
