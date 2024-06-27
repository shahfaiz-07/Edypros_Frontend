import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ConfirmationModal from "./../../common/ConfirmationModal";
import { deleteSection, deleteVideo } from "../../../services/operations/courseAPI";
import VideoModal from "./VideoModal";

const NestedView = ({ handleEditSectionName }) => {
	const { course } = useSelector((state) => state.course);

	const { token } = useSelector((state) => state.auth);
	const dispatch = useDispatch();

	const [confirmationModal, setConfirmationModal] = useState(null);

	const [viewVideo, setViewVideo] = useState(null);
	const [editVideo, setEditVideo] = useState(null);
	const [addVideo, setAddVideo] = useState(null);

	const handleDeleteSection = async (sectionId) => {
		const result = await deleteSection(dispatch, sectionId, token);
		console.log("DELETE RESULT =>> ", result);
	};

  const handleDeleteVideo = async (videoId) => {
	await deleteVideo(dispatch, videoId, token)
  }
	return (
		<div>
			<div>
				{course.sections?.map((section) => (
					<details key={section._id} className="mt-4" open>
						<summary className="flex cursor-pointer items-center justify-between border-b-2 border-b-richblack-600 py-2">
							<div className="flex items-center gap-x-3">
								<i className="ri-menu-2-line text-[25px] text-richblack-50"></i>
								<p className="font-semibold text-richblack-50">
									{section.name}
								</p>
							</div>
							<div className="flex items-center gap-x-3">
								<button>
									<i
										className="ri-pencil-line text-lg text-richblack-50"
										onClick={() =>
											handleEditSectionName(section._id, section.name)
										}
									></i>
								</button>
								<button>
									<i
										className="ri-delete-bin-line text-lg text-richblack-50"
										onClick={() => {
											setConfirmationModal({
												text1: "Delete this Section?",
												text2:
													"All the lectures in this section will be deleted",
												btn1Text: "Delete",
												btn2Text: "Cancel",
												btn1Handler: () => handleDeleteSection(section._id),
												btn2Handler: () => setConfirmationModal(null),
											});
										}}
									></i>
								</button>
								<span className="font-medium text-richblack-300">|</span>
								<i className="ri-arrow-down-s-fill text-lg text-richblack-50"></i>
							</div>
						</summary>
						<div className="px-6 pb-4">
							{section.videos.map((video) => (
								<div
									
									key={video._id}
									className="flex cursor-pointer items-center justify-between gap-x-3 border-b-2 border-b-richblack-600 py-2 z-0"
								>
									<div className="flex items-center gap-x-3" onClick={() => setViewVideo(video)}>
										<i className="ri-menu-2-line text-[25px] text-richblack-50"></i>
										<p className="font-semibold text-richblack-50">
											{video.title}
										</p>
									</div>
									<div className="flex items-center gap-x-3">
										<button>
											<i
												className="ri-pencil-line text-lg text-richblack-50"
												onClick={() => setEditVideo(video)}
											></i>
										</button>
										<button>
											<i
												className="ri-delete-bin-line text-lg text-richblack-50"
												onClick={() => {
													setConfirmationModal({
														text1: "Delete this Video?",
														text2:
															"Selected video will be deleted",
														btn1Text: "Delete",
														btn2Text: "Cancel",
														btn1Handler: () => handleDeleteVideo(video._id),
														btn2Handler: () => setConfirmationModal(null),
													});
												}}
											></i>
										</button>
									</div>
								</div>
							))}
							<button
								onClick={() => setAddVideo(section._id)}
								className="mt-3 flex items-center gap-x-1 text-yellow-50 font-bold text-sm border-2 rounded-full py-1 px-2 border-yellow-50"
							>
                <i className="ri-add-circle-line text-light text-yellow-50 font-bold"></i>
								<p>Add Lecture</p>
							</button>
						</div>
					</details>
				))}
			</div>
			{confirmationModal && (
				<ConfirmationModal
					modalData={confirmationModal}
					setConfirmationModal={setConfirmationModal}
				/>
			)}
      {
           addVideo ? <VideoModal modalData={addVideo} setModalData={setAddVideo}  add={true} /> : 
              editVideo ? <VideoModal modalData={editVideo} setModalData={setEditVideo} edit={true} /> : 
                viewVideo ? <VideoModal modalData={viewVideo} setModalData={setViewVideo} view={true} /> : null
      }
		</div>
	);
};

export default NestedView;
