import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import ReactStars from "react-stars";
import { calculateAverageCourseRating } from "../../utils/calculateAverageRating";

const WishlistItem = ({ wishlistData, handleRemoveFromWishlist }) => {
	const navigate = useNavigate();
	const averageRating = calculateAverageCourseRating(wishlistData)
	return (
		<div className="flex flex-col md:flex-row justify-between gap-x-3 px-3 py-5 border-b border-richblack-500 hover:bg-richblack-800 hover:bg-opacity-50">
			<img
				src={wishlistData.thumbnail}
				alt=""
				className="aspect-[5/3] md:h-36 rounded object-cover"
			/>
			<div className="flex flex-col md:flex-row w-full justify-between">
				<div className="flex flex-col gap-y-1 justify-between ">
					<div>
						<h2
							className="text-white text-lg md:text-md mt-1 text-ellipsis cursor-pointer hover:underline"
							onClick={() => navigate(`/course/${wishlistData._id}`)}
						>
							{wishlistData.name}
						</h2>
						<p className="text-xs text-richblack-500">
							By Prof. {wishlistData.instructor.firstName}{" "}
							{wishlistData.instructor.lastName}
						</p>
					</div>
					<p className="text-ellipsis overflow-hidden text-richblack-400 text-sm">
						{wishlistData.description.slice(0, 70)} {wishlistData.description.length > 70 && "..."}
					</p>
					<div
						className="text-xs px-2 py-1 font-semibold w-fit bg-richblack-700 rounded-full cursor-pointer"
						style={{ color: `#${wishlistData.category.color}` }}
						onClick={() => navigate(`/catalog/${wishlistData.category._id}`)}
					>
						{wishlistData.category.title}
					</div>
					<div className="text-[#ffd700] text-sm md:text-xs flex gap-x-2">
						<span>{averageRating}</span>{" "}
						<ReactStars
							count={5}
							value={averageRating}
							size={14}
							edit={false}
							color2={"#ffd700"}
							disabled
						/>{" "}
						<span className="text-richblack-500">
							({wishlistData.ratingAndReviews.length})
						</span>
					</div>
				</div>
				<div className="flex flex-col-reverse gap-y-2 md:w-fit">
					<button
						className="text-pink-300 py-1 px-2 bg-richblack-800 text-sm rounded border border-richblack-700"
						onClick={() => handleRemoveFromWishlist(wishlistData._id)}
					>
						Remove
					</button>
					<p className="text-[#ffd700]">Rs. {wishlistData.price}</p>
				</div>
			</div>
		</div>
	);
};

export default WishlistItem;
