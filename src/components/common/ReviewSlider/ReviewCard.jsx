import React from "react";
import ReactStars from "react-stars";

const ReviewCard = ({card}) => {
	
	return (
		<div className="w-[350px] h-[200px] bg-richblack-800 p-4 mx-auto">
			<div className="flex flex-col justify-between h-full">
				<div className="flex flex-col gap-y-2">
					<div className="flex gap-x-2">
                        
						<img
							src={card.reviewedBy.avatar}
							alt=""
							className="aspect-square w-12 h-12 rounded-full object-cover"
						/>
						<div className="flex flex-col justify-between">
							<h3 className="text-richblack-5 font-semibold">
								{card.reviewedBy.firstName} {card.reviewedBy?.lastName}
							</h3>
							<p className="text-sm text-richblack-200">{card.reviewed.name}</p>
						</div>
					</div>
					<div className="text-richblack-25">{card.review.slice(0, 85)} {card.review.length>85 && "..."}</div>
					
				</div>
                <div className="flex gap-x-2">
						<span className="text-yellow-50">{card.rating}</span>{" "}
						<ReactStars
							count={5}
							value={card.rating}
							size={14}
							edit={false}
							color2={"#ffd700"}
						/>{" "}
					</div>
			</div>
		</div>
	);
};

export default ReviewCard;
