import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { buyCourses } from "../../services/operations/paymentAPI";
import { ACCOUNT_TYPE } from "./../../constants";
import {
	addToWishlist,
	getCurrentUser,
	removeFromWishlist,
} from "../../services/operations/profileAPI";
import { setUser } from "../../features/auth/profileSlice";
import { resetViewCourse } from "../../features/registeredCourses/viewCourseSlice";

const BuyNowCard = ({ course }) => {
	const { token } = useSelector((state) => state.auth);
	const { user } = useSelector((state) => state.profile);
	const { totalItems } = useSelector((state) => state.wishlist);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [inWishlist, setInWishlist] = useState(false);
	const [alreadyBought, setAlreadyBought] = useState(false);
	const handleToggleWishlist = async () => {
		if (!token) {
			toast("Login to add this course to wishlist", {
				icon: "❗",
			});
		} else if (user.accountType === ACCOUNT_TYPE.INSTRUCTOR) {
			toast("Instructor cannot add course to wishlist !", {
				icon: "❗",
			});
		} else {
			if (!inWishlist) {
				await addToWishlist(
					totalItems,
					dispatch,
					token,
					course._id,
					setInWishlist
				);
			} else {
				await removeFromWishlist(
					totalItems,
					dispatch,
					token,
					course._id,
					setInWishlist
				);
			}
		}
	};

	useEffect(() => {
		if (user?.wishlist.includes(course._id)) {
			setInWishlist(true);
		}
		if (user?.registeredCourses.includes(course._id)) {
			setAlreadyBought(true);
		}
	}, []);

	useEffect(() => {
		if (user?.wishlist.includes(course._id)) {
			setInWishlist(true);
		}
		if (user?.registeredCourses.includes(course._id)) {
			setAlreadyBought(true);
		}
	}, [user, setUser]);

	const handleBuyNow = async () => {
		if (!token) {
			toast("Login to Purchase this Course", {
				icon: "❗",
			});
		} else if (user.accountType === ACCOUNT_TYPE.INSTRUCTOR) {
			toast("Instructor cannot purchase course !");
		} else {
			await buyCourses([course._id], token, user, navigate, dispatch);
		}
	};

	const handleViewCourse = () => {
		dispatch(resetViewCourse());
		navigate(
			`/view-course/${course._id}/${course.sections[0]._id}/${course.sections[0].videos[0]._id}`
		);
	};
	return (
		<div className=" md:relative md:-translate-y-1/4 md:rounded-lg md:bg-richblack-700 py-4 md:px-4 flex flex-col gap-y-2 mx-auto max-w-[30rem]">
			<img
				src={course.thumbnail}
				alt=""
				className="rounded aspect-video object-cover"
			/>
			{
				(!user || !token) && (<>
				<p className="text-richblack-5 font-semibold text-lg">
				Rs. {course.price}
			</p>
			<button
				className="bg-yellow-50 rounded w-full py-2 font-semibold"
				onClick={handleBuyNow}
			>
				Buy Now
			</button>
			<button
				className="bg-richblack-800 md:bg-richblack-900 rounded w-full py-2 font-semibold text-richblack-5"
				onClick={handleToggleWishlist}
			>
				{inWishlist ? "Remove From Wishlist" : "Add To Wishlist"}
			</button></>)
			}
			{user && user.accountType === ACCOUNT_TYPE.STUDENT ? (
				!alreadyBought ? (
					<>
						<p className="text-richblack-5 font-semibold text-lg">
							Rs. {course.price}
						</p>
						<button
							className="bg-yellow-50 rounded w-full py-2 font-semibold"
							onClick={handleBuyNow}
						>
							Buy Now
						</button>
						<button
							className="bg-richblack-800 md:bg-richblack-900 rounded w-full py-2 font-semibold text-richblack-5"
							onClick={handleToggleWishlist}
						>
							{inWishlist ? "Remove From Wishlist" : "Add To Wishlist"}
						</button>
					</>
				) : (
					<>
						<p className="text-richblack-5 font-semibold px-2 py-1 bg-caribbeangreen-500 text-xs w-fit rounded-full">
							Already Purchased{" "}
							<i className="font-light ri-checkbox-circle-fill"></i>
						</p>
						<button
							className="bg-yellow-50 rounded w-full py-2 font-semibold"
							onClick={handleViewCourse}
						>
							View Course
						</button>
					</>
				)
			) : (
				alreadyBought && (
					<p className="text-richblack-5 font-semibold px-2 py-1 bg-pink-400 text-xs w-fit rounded-full">
						Your Course <i className="font-light ri-checkbox-circle-fill"></i>
					</p>
				)
			)}
			<div className="text-yellow-50 text-center">
				<span
					onClick={() => {
						window.navigator.clipboard.writeText(window.location.href);
						toast.success("Link copied to clipboard");
					}}
					className="cursor-pointer"
				>
					<i className="ri-share-fill"></i> Share
				</span>
			</div>
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
				<div className="flex flex-wrap gap-1 py-1">
					{course.tags.map((tag, index) => (
						<p
							key={index}
							className="px-2 py-1 bg-yellow-500 text-richblack-5 text-xs rounded-full font-semibold"
						>
							{tag}
						</p>
					))}
				</div>
			</div>
		</div>
	);
};

export default BuyNowCard;
