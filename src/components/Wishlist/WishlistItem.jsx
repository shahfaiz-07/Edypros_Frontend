import React, { useEffect } from "react";
import ReactStars from "react-stars";

const WishlistItem = ({ wishlistData }) => {
	// useEffect(() => {
	//     console.log("Wishlist Data .........",wishlistData)
	// }, [])
	return (
		<div className="flex justify-between gap-x-3 px-3 py-5 border-b border-richblack-500">
			<img
				src={wishlistData.thumbnail}
				alt=""
				className="aspect-[5/3] h-24 rounded"
			/>
            <div className="flex w-full justify-between">
            <div className="flex flex-col justify-between w-full">
				<div>
					<h2 className="text-white text-ellipsis">{wishlistData.name}</h2>
					<p className="text-xs text-richblack-500">
						By Prof. {wishlistData.instructor.firstName}{" "}
						{wishlistData.instructor.lastName}
					</p>
				</div>
				<p className="text-ellipsis text-richblack-400 text-sm">
					{wishlistData.description}
				</p>
                <p className="text-[#ffd700] text-sm flex gap-x-2"><span>3.5</span> <ReactStars
					count={5}
					// onChange={ratingChanged}
                    value={3.5}
					size={14}
                    edit={false}
					color2={"#ffd700"}
                    disabled
				/> <span className="text-richblack-500">(Review Count)</span></p>
				
			</div>
                <div className="flex flex-col gap-y-2">
                    <button className="text-pink-300 py-1 px-2 bg-richblack-800 text-sm rounded border border-richblack-700">Remove</button>
                    <p className="text-[#ffd700]">Rs. {wishlistData.price}</p>
                </div>
            </div>
		</div>
	);
};

export default WishlistItem;
