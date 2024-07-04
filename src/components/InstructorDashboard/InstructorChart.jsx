import React, { useState } from "react";
import Chart from "chart.js/auto";
import { CategoryScale, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut, Pie, Bar, Line } from "react-chartjs-2";

Chart.register(CategoryScale, ArcElement, Tooltip, Legend);

const InstructorChart = ({ courses }) => {
	const [chartTypeStudent, setChartTypeStudent] = useState(true);
	const randomColor = (num) => {
		const colors = [];
		for (let i = 0; i < num; i++) {
			colors.push(
				`rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(
					Math.random() * 255
				)}, ${Math.floor(Math.random() * 255)}, 0.9)`
			);
		}
		return colors;
	};
	const studentData = {
		labels: courses.map((course) => course.name),
		datasets: [
			{
				label: "Students Enrolled",
				data: courses.map((course) => course.studentsEnrolled),
				backgroundColor: randomColor(courses.length),
				borderWidth: 1,
			},
		],
	};
	const incomeData = {
		labels: courses.map((course) => course.name),
		datasets: [
			{
				label: "Course Income(In Rs.)",
				data: courses.map((course) => course.courseRevenue),
				backgroundColor: randomColor(courses.length),
				borderWidth: 1,
			},
		],
	};
	const options = {
		responsive: true,
		plugins: {
			title: {
				display: true,
				text: "Students Enrolled in Courses",
				color: "#ffffff", // Set title color
				font: {
					size: 18,
				},
			},
			legend: {
				labels: {
					color: "#fff", // Set labels color
				},
			},
		},
	};
	return (
		courses && (
			<div className="text-richblack-5 flex flex-col items-center gap-y-2 p-2 md:p-4">
				<div className="flex gap-x-2 items-center">
					<p className="font-semibold text-richblack-25">Chart Data :</p>
					<button
						className={`px-3 py-1 rounded font-semibold text-yellow-50 ${
							chartTypeStudent && "bg-richblack-700"
						}`}
						onClick={() => setChartTypeStudent(true)}
					>
						Students
					</button>
					<button
						className={`px-3 py-1 rounded font-semibold text-pink-200 ${
							!chartTypeStudent && "bg-richblack-700"
						}`}
						onClick={() => setChartTypeStudent(false)}
					>
						Income
					</button>
				</div>
				<div className="pb-2">
					<Pie
						data={chartTypeStudent ? studentData : incomeData}
						options={options}
					/>
				</div>
			</div>
		)
	);
};

export default InstructorChart;
