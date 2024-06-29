import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./styles.css"
import { Autoplay, FreeMode, Navigation, Pagination, Mousewheel, Keyboard } from "swiper/modules";
import SwiperCourseItem from "./SwiperCourseItem";
const SwiperJsSlider = ({ courses, autoplay }) => {
	return (
		<>
			<Swiper mousewheel={{
							enabled: true,
							forceToAxis: true,
						}}
						keyboard={{
							enabled: true,
							onlyInViewport: true,
						}}
						allowSlidePrev={true}
						slidesPerView={1}
						loop={true}
						spaceBetween={20}
						pagination={true}
						modules={[Autoplay, Pagination, Navigation, FreeMode, Mousewheel, Keyboard]}
						className="mySwiper md:pt-5"
						autoplay={{
							enabled: autoplay,
						delay: 3000,
						disableOnInteraction: false,
						}}
						style={{
							"--swiper-navigation-size": "30px",
                            
						}}
						freeMode={true}
						navigation={true}
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
						}}>
				{courses.map((course) => (
					<SwiperSlide
						key={course._id}
						
					>
						<SwiperCourseItem course={course} />
					</SwiperSlide>
				))}
			</Swiper>
		</>
	);
};

export default SwiperJsSlider;
