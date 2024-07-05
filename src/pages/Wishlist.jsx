import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getWishlistData, removeFromWishlist } from "../services/operations/profileAPI";
import Spinner from "../components/common/Spinner";
import WishlistItem from "./../components/Wishlist/WishlistItem";
import WishlistTotal from './../components/Wishlist/WishlistTotal';

const Wishlist = () => {
	const { loading } = useSelector((state) => state.profile);
	const { token } = useSelector( state => state.auth )
	const {totalItems} = useSelector(state => state.wishlist)
	const [wishlist, setWishlist] = useState([]);
	const dispatch = useDispatch();
	const fetchWishlist = async () => {
		const response = await getWishlistData(dispatch, token);
		setWishlist(response);
	};
	useEffect(() => {
		fetchWishlist();
	}, []);

	const handleRemoveFromWishlist = async (courseId) => {
		await removeFromWishlist(totalItems, dispatch, token, courseId)
		await fetchWishlist()
	}
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
		<div className="min-h-[calc(100vh-3.5rem)] max-w-[500px] md:w-11/12 md:max-w-full mx-auto font-inter py-5">
      <p className="text-sm text-richblack-400 border-b border-richblack-600 pb-2">{wishlist.length} courses in wishlist</p>
			<div className="flex flex-col lg:flex-row gap-x-3 justify-between">
				<div className="flex flex-col lg:w-[70%]">
					{wishlist.map((course) => (
						<WishlistItem key={course._id} wishlistData={course} handleRemoveFromWishlist={handleRemoveFromWishlist}/>
					))}
				</div>
        <div className="lg:w-[30%] py-5">
            <WishlistTotal wishlist={wishlist}/>
        </div>
			</div>

		</div>
	);
};

export default Wishlist;
