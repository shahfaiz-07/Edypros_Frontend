import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "remixicon/fonts/remixicon.css";
import Button from "./../components/buttons/Button";
import banner from "../assets/Images/banner.mp4";
import CodeSection from "../components/Home/CodeSection";
import TimelineSection from "../components/Home/TimeLineSection";
import LearningSection from "./../components/Home/LearningSection";
import BecomeInstructor from "./../components/Home/BecomeInstructor";
import UnlockSection from "./../components/Home/UnlockSection";
import ReviewSlider from "../components/common/ReviewSlider/ReviewSlider";
import { getTopRatings } from "../services/operations/ratingsAndReviewsAPI";
import Spinner from '../components/common/Spinner'

const Home = () => {
	const [reviews, setReviews] = useState([]);
	const [loading, setLoading] = useState(true);
	const fetchCourseTopReviews = async () => {
		await getTopRatings()
		.then((response) => {
			setReviews(response);
		}).finally(() => {
			setLoading(false);
		});
	};
	useEffect(() => {
		fetchCourseTopReviews();
	}, []);
	return loading ? (
        <Spinner />
    ) : (
        <div>
            <div className="mt-16 relative mx-auto flex flex-col w-11/12 items-center justify-between">
                <Link to="/register">
                    <div className="flex bg-richblack-800 rounded-full px-5 py-3 gap-2 hover:gap-3 text-pure-greys-200 transition-all duration-200 hover:scale-95 shadow-richblack-200 shadow-sm">
                        <p>Become an Instructor</p>
                        <i className="ri-arrow-right-line"></i>
                    </div>
                </Link>

                <div className="mt-10 text-center">
                    <h2 className="text-white text-3xl font-semibold">
                        Empower Your Future with{" "}
                        <span className="text-[#1FA2FF]">Coding Skills</span>
                    </h2>
                    <p className="mt-5 text-[#838894] text-sm">
                        With our online coding courses, you can learn at your
                        own pace, from anywhere in the world, and get access to
                        a wealth of resources, including hands-on projects,
                        quizzes, and personalized feedback from instructors.{" "}
                    </p>

                    <div className="flex mt-5 justify-center gap-5">
                        <Button
                            text={"Learn More"}
                            bgColor={"bg-yellow-50"}
                            textColor={"text-black"}
                            action={"/"}
                        />
                        <Button
                            text={"Book a Demo"}
                            bgColor={"bg-richblack-800"}
                            textColor={"text-white"}
                            action={"/"}
                        />
                    </div>

                    <div className="shadow-[35px_35px_60px_-15px_rgba(250,250,250,0.3)] md:mx-10 lg:mx-20 my-5 md:my-10">
                        <video src={banner} muted autoPlay loop></video>
                    </div>
                </div>
                <div className="flex flex-col">
                    <CodeSection
                        text1={
                            "Unlock your coding potential with our online courses."
                        }
                        text2={
                            "Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."
                        }
                        buttonText1={"Try it Yourself"}
                        buttonText2={"Learn More"}
                        direction={"flex-col md:flex-row"}
                    />
                    <CodeSection
                        text1={"Start coding in seconds"}
                        text2={
                            "Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."
                        }
                        buttonText1={"Continue Lesson"}
                        buttonText2={"Learn More"}
                        direction={"flex-col md:flex-row-reverse"}
                    />
                </div>
                <UnlockSection />
            </div>
            <div className="bg-pure-greys-5 text-richblack-700 bg-hero-pattern h-[300px] flex items-center w-full">
                <div className="w-11/12 max-w-maxContent flex items-center gap-5 mx-auto">
                    <div className="flex gap-10 justify-center w-full">
                        <Button
                            text={"Explore Full Catalog"}
                            isArrow={true}
                            bgColor={"bg-yellow-50"}
                        />
                        <Button
                            text={"Learn More"}
                            bgColor={"bg-richblack-800"}
                            textColor={"text-white"}
                        />
                    </div>
                </div>
            </div>
            <div className="w-full bg-white mx-auto flex justify-center">
                <div className="w-11/12 flex flex-col md:flex-row my-10">
                    <div className="w-full md:w-1/2 text-4xl font-semibold">
                        Get the skills you need for a{" "}
                        <span className="text-[#20BDFF]">
                            job that is in demand.
                        </span>
                    </div>
                    <div className="w-full my-5 md:my-0 md:w-1/2">
                        <p>
                            The modern Edypros is the dictates its own terms.
                            Today, to be a competitive specialist requires more
                            than professional skills.
                        </p>
                        <br />
                        <Button text={"Learn More"} bgColor={"bg-yellow-50"} />
                    </div>
                </div>
            </div>
            <div className="bg-white mx-auto flex justify-center h-fit">
                <TimelineSection />
            </div>
            <div className="bg-white mx-auto">
                <LearningSection />
            </div>
            <div className="bg-richblack-900 w-full">
                <div className="w-11/12 mx-auto px-10 pb-10">
                    <BecomeInstructor />
                </div>
            </div>
            <div className="bg-richblack-900 w-full">
                <div className="w-11/12 mx-auto pb-10">
                    <ReviewSlider reviews={reviews} />
                </div>
            </div>
        </div>
    );
};

export default Home;
