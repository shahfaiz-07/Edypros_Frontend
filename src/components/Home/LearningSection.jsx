import React from "react";
import img1 from '../../assets/Images/Know_your_progress.png'
import img2 from '../../assets/Images/Plan_your_lessons.png'
import img3 from '../../assets/Images/Compare_with_others.png'
import Button from './../buttons/Button';

const LearningSection = () => {
	return (
		<div className="mx-auto py-20 w-11/12 flex flex-col items-center">
			<div className="text-4xl font-semibold text-center">
				Your Swiss Knife for{" "}
				<span className="text-[#1FA2FF]">learning any language</span>
			</div>
            <p className="text-center w-2/3 mt-5">Using spin making learning multiple languages easy. with 20+ languages realistic voice-over, progress tracking, custom schedule and more.</p>
            <div className="flex flex-col md:flex-row items-center justify-center md:h-[350px] w-[80%] my-20">
                <img src={img1} alt="" className="object-contain md:relative md:-translate-x-[80%]"/>
                <img src={img3} alt="" className="object-contain md:absolute"/>
                <img src={img2} alt="" className="object-contain md:absolute md:translate-x-[70%]"/>
            </div>
            <Button text={'Learn More'} bgColor={'bg-yellow-50'}/>
		</div>
	);
};

export default LearningSection;
