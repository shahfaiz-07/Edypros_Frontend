import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router";
import { setCurrentVideo } from "../../features/registeredCourses/viewCourseSlice";
import { Player } from "video-react";
import ReactPlayer from "react-player/lazy";
import { markAsComplete } from "../../services/operations/studentAPI";
import { getCourseRatings } from "../../services/operations/ratingsAndReviewsAPI";
import ReviewSlider from "../common/ReviewSlider/ReviewSlider";

const VideoSection = () => {
	const { currentVideo, completedLectures, courseData } = useSelector(
		(state) => state.viewCourse
	);

	const [videoEnded, setVideoEnded] = useState(false);
	const [pip, setPip] = useState(false)
	const { courseId, sectionId, videoId } = useParams();
	const { token } = useSelector(state => state.auth)
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const location = useLocation();
	const playerRef = useRef(null);
	const [reviews, setReviews] = useState([])

	const fetchCourseReviews = async () => {
		const response = await getCourseRatings(courseId);
		setReviews(response)
	}

	const findCurrentIndices = () => {
		const currentSectionIndex = courseData.sections.findIndex(
			(section) => section._id === sectionId
		);
		const currentVideoIndex = courseData.sections[
			currentSectionIndex
		].videos.findIndex((video) => video._id === videoId);
		return [currentSectionIndex, currentVideoIndex];
	};
	const isFirstLecture = () => {
		const [currentSectionIndex, currentVideoIndex] = findCurrentIndices();

		if (currentSectionIndex === 0 && currentVideoIndex === 0) {
			return true;
		}
		return false;
	};

	const isLastLecture = () => {
		const [currentSectionIndex, currentVideoIndex] = findCurrentIndices();
		const numberOfVideos =
			courseData.sections[currentSectionIndex].videos.length;
		if (
			currentSectionIndex === courseData.sections.length - 1 &&
			currentVideoIndex === numberOfVideos - 1
		) {
			return true;
		}
		return false;
	};

	const goToNext = () => {
		const [currentSectionIndex, currentVideoIndex] = findCurrentIndices();
		const numberOfVideos =
			courseData.sections[currentSectionIndex].videos.length;
		let sectionID = sectionId;
		let videoID = videoId;
		if (currentVideoIndex === numberOfVideos - 1) {
			sectionID = courseData.sections[currentSectionIndex + 1]._id;
			videoID = courseData.sections[currentSectionIndex + 1].videos[0]._id;
		} else {
			sectionID = courseData.sections[currentSectionIndex]._id;
			videoID =
				courseData.sections[currentSectionIndex].videos[currentVideoIndex + 1]
					._id;
		}
		navigate(`/view-course/${courseData._id}/${sectionID}/${videoID}`);
	};

	const goToPrev = () => {
		const [currentSectionIndex, currentVideoIndex] = findCurrentIndices();
		let sectionID = sectionId;
		let videoID = videoId;
		if (currentVideoIndex === 0) {
			const numberOfVideos =
				courseData.sections[currentSectionIndex - 1].videos.length;
			sectionID = courseData.sections[currentSectionIndex - 1]._id;
			videoID =
				courseData.sections[currentSectionIndex - 1].videos[numberOfVideos - 1]
					._id;
		} else {
			sectionID = courseData.sections[currentSectionIndex]._id;
			videoID =
				courseData.sections[currentSectionIndex].videos[currentVideoIndex - 1]
					._id;
		}

		navigate(`/view-course/${courseData._id}/${sectionID}/${videoID}`);
	};
	const handleMarkComplete = async () => {
		await markAsComplete(dispatch, {courseId, videoId}, token)
	}

	const handleReplay = () => {
		playerRef.current.seekTo(0, "sections")
		setVideoEnded(false)
	}

	const togglePip = () => {
		setPip( (prev) => !prev)
	}

	useEffect(() => {
		setVideoEnded(false);
	}, [currentVideo])
	useEffect(() => {
		const _section = courseData.sections.filter(
			(section) => section._id.toString() === sectionId
		);
		const _video = _section[0].videos.filter(
			(video) => video._id.toString() === videoId
		);

		dispatch(setCurrentVideo(_video[0]));
		fetchCourseReviews()
	}, [location.pathname]);

	return (
		<div className="w-11/12 mx-auto text-richblack-5 space-y-1">
			<div className="aspect-video w-full relative group">
				<ReactPlayer
					url={currentVideo.url}
					ref={playerRef}
					pip={pip}
					width="100%"
					height={"100%"}
					className="react-player"
					onEnded={() => {setVideoEnded(true)}}
					controls
				/>
				{
					<button className="absolute top-0 left-0 text-richblack-5 w-10 h-10 aspect-square grid place-content-center bg-richblack-800 text-xl" onClick={togglePip}>
						{ pip ? <i className="ri-picture-in-picture-exit-line "></i> : <i className="ri-picture-in-picture-2-line"></i>}
					</button>
				}
				{videoEnded && (
					<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col gap-y-2 items-center">
						{
						!completedLectures.includes(currentVideo._id) && <button
							className="bg-yellow-50 px-3 py-2 rounded  text-black font-semibold text-sm"
							onClick={handleMarkComplete}
						>
							Mark As Complete <i className="ri-checkbox-circle-fill"></i>
						</button>
						}
						<button className="px-3 py-2 rounded bg-richblack-700 font-semibold text-sm w-fit" onClick={handleReplay}><i className="ri-play-reverse-large-fill"></i> Replay</button>
					</div>
				)}
			</div>
			<div className="flex justify-between text-black px-3 pb-3">
				<div>
					{!isFirstLecture() && (
						<button
							className="px-3 py-1 bg-yellow-50 rounded font-semibold"
							onClick={() => goToPrev()}
						>
							<i className="ri-arrow-left-s-fill"></i> Prev
						</button>
					)}
				</div>
				<div>
					{!isLastLecture() && (
						<button
							className="px-3 py-1 bg-yellow-50 rounded font-semibold"
							onClick={() => goToNext()}
						>
							Next <i className="ri-arrow-right-s-fill"></i>
						</button>
					)}
				</div>
			</div>
			<h2 className="text-2xl md:text-3xl lg:text-4xl px-3 mt-5">{currentVideo?.title}</h2>
			<p className="text-lg px-3  text-richblack-300">
				{currentVideo?.description}
			</p>
			<div className="bg-richblack-900 w-full mx-auto">
				<div className="w-11/12 mx-auto py-10">
					<ReviewSlider text={"See what others say"} reviews={reviews} />
				</div>
			</div>
		</div>
	);
};

export default VideoSection;
