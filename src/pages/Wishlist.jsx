import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getWishlistData, removeFromWishlist } from "../services/operations/profileAPI";
import Spinner from "../components/common/Spinner";
import WishlistItem from "./../components/Wishlist/WishlistItem";
import WishlistTotal from './../components/Wishlist/WishlistTotal';
import VerifyPaymentOverlay from "../components/common/VerifyPayment/VerifyPaymentOverlay";

const Wishlist = () => {
	const { loading } = useSelector((state) => state.profile);
	const { token } = useSelector( state => state.auth )
	const {totalItems} = useSelector(state => state.wishlist)
	const {paymentLoading} = useSelector(state => state.course)
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
		<div className="min-h-[calc(100vh-3.5rem)] grid place-content-center text-center max-w-[600px] mx-auto">
			<h1 className="text-white text-3xl font-semibold py-2">
				Your Wishlist is Empty
			</h1>
			<p className="text-[#AFB2BF] font-semibold">
				You have not added anything to your wishlist yet. Browse courses from the catalog and add them to your wishlist to purchase later.
			</p>
		</div>
	) : (
		<div className="min-h-[calc(100vh-3.5rem)] max-w-[500px] md:w-11/12 md:max-w-full mx-auto font-inter py-5">
			<h1 className="text-3xl mb-5 text-richblack-5">Wishlist</h1>
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
			{paymentLoading && <VerifyPaymentOverlay/>}
		</div>
	);
};

export default Wishlist;
