import React, { useEffect, useState } from "react";
import ReviewCard from "./ReviewCard";
import { getTopRatings } from "../../../services/operations/ratingsAndReviewsAPI";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./style.css";
import {
	Autoplay,
	FreeMode,
	Navigation,
	Pagination,
	Mousewheel,
	Keyboard,
	EffectFade,
} from "swiper/modules";

const ReviewSlider = ({ reviews, text }) => {
	
	return (
		reviews.length > 0 && (
			<div className="w-full">
				<h1 className="text-4xl text-richblack-5 font-semibold text-semibold text-center mb-5">
					{text ? text : "Reviews from other learners"}
				</h1>
				<Swiper
					mousewheel={{
						enabled: true,
						forceToAxis: true,
					}}
					modules={[
						Autoplay,
						Pagination,
						Navigation,
						FreeMode,
						Mousewheel,
						Keyboard,
						EffectFade,
					]}
					keyboard={{
						enabled: true,
						onlyInViewport: true,
					}}
					slidesPerView={1}
					loop={true}
					effect="slide"
					spaceBetween={10}
					// pagination={true}
					className="mySwiper md:pt-5"
					speed={3000}
					centeredSlides={true}
					autoplay={{
						delay: 0,
						disableOnInteraction: false,
					}}
					// style={{
					// 	"--swiper-navigation-size": "30px",

					// }}
					freeMode={true}
					// navigation={true}
					// navigation={
					//     {
					//         nextEl: ".swiper-button-next",
					//         prevEl: ".swiper-button-prev",
					//     }
					// }
					breakpoints={{
						300: { slidesPerView: 1, spaceBetween: 10 },
						640: { slidesPerView: "auto" },
						1024: { slidesPerView: "auto" },
					}}
				>
					{reviews.map((review) => (
						<SwiperSlide key={review._id}>
							<ReviewCard card={review} />
						</SwiperSlide>
					))}
				</Swiper>
			</div>
		)
	);
};

export default ReviewSlider;
