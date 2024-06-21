import React from "react";
import Button from "../buttons/Button";
import { TypeAnimation } from "react-type-animation";

const CodeSection = ({ text1, text2, buttonText1, direction, buttonText2 }) => {
	return (
		<div className={`flex md:px-4 ${direction} my-5 md:my-10 lg:my-20 font-inter w-full gap-10`}>
			<div className="w-full md:w-1/2">
				<p className="text-white text-2xl">{text1}</p>
				<p className="text-sm text-richblack-300 mt-3 mb-10">{text2}</p>

				<div className="flex gap-3">
					<Button text={buttonText1} bgColor={"bg-yellow-50"} isArrow={true}/>
					<Button
						text={buttonText2}
						bgColor={"bg-richblack-800"}
						textColor={"text-white shadow-xs shadow-white"}
						action={"/"}
					/>
				</div>
			</div>
            <div className="w-full md:w-1/2 h-full border border-pure-greys-500 p-5">
            <div className="w-full flex">
            <div className="w-[10%] text-pure-greys-400 text-xs md:text-sm font-mono">1<br/>2<br/>3<br/>4<br/>5<br/>6<br/>7<br/>8<br/>9<br/>10<br/>11</div>
            <div className="w-[90%] mx-auto">
				<TypeAnimation
					style={{ whiteSpace: "pre-line", display: "block", fontFamily:"monospace", width:"full", color: "#FFD60A"}}
					sequence={[
						`<!DOCTYPE html>\n<html>\n<head><title>Example</title>\n<link rel="stylesheet" href="styles.css">\n</head>\n<body>\n<h1><a href="/">Header</a></h1>\n<nav><a href="one/">One</a>\n<a href="two/">Two</a>\n<a href="three/">Three</a>\n</nav>`,
						1000,
						"",
					]}
                    speed={{type: 'keyStrokeDelayInMs', value: 25}}
                    omitDeletionAnimation={true}
                    className={'text-white w-full text-xs md:text-sm'}
					repeat={Infinity}
				/>
			</div>
            </div>
            </div>
		</div>
	);
};

export default CodeSection;
