import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getWishlistData } from "../services/operations/profileAPI";
import Spinner from "../components/common/Spinner";
import WishlistItem from "./../components/Wishlist/WishlistItem";
import WishlistTotal from './../components/Wishlist/WishlistTotal';

const Wishlist = () => {
	const { token, loading } = useSelector((state) => state.profile);
	const [wishlist, setWishlist] = useState([]);
	const dispatch = useDispatch();
	const fetchWishlist = async () => {
		const response = await getWishlistData(dispatch, token);
		console.log(response);
		setWishlist(response);
	};
	useEffect(() => {
		fetchWishlist();
	}, []);
	return loading ? (
		<Spinner />
	) : wishlist.length === 0 ? (
		<div className="min-h-[calc(100vh-3.5rem)] grid place-content-center text-center">
			<h1 className="text-white text-3xl font-semibold py-2">
				No Courses Registered
			</h1>
			<p className="text-[#AFB2BF] font-semibold">
				You have no purchased courses yet. Add to wishlist to start your
				learning jouney now
			</p>
		</div>
	) : (
		<div className="min-h-[calc(100vh-3.5rem)] w-11/12 mx-auto font-inter py-5">
      <p className="text-sm text-richblack-400 border-b border-richblack-600 pb-2">{wishlist.length} courses in wishlist</p>
			<div className="flex justify-between">
				<div className="flex flex-col w-[70%]">
					{wishlist.map((course) => (
						<WishlistItem key={course._id} wishlistData={course} />
					))}
				</div>
        <div className="w-[25%] py-5">
            <WishlistTotal wishlist={wishlist} totalPrice={5000}/>
        </div>
			</div>

		</div>
	);
};

export default Wishlist;
