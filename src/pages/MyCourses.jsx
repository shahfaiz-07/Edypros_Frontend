import React, { useEffect, useState } from "react";
import { getInstructorCourses } from "../services/operations/courseAPI";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../components/common/Spinner";
import IconButton from './../components/buttons/IconButton';
import { useNavigate } from 'react-router-dom';
import TableItem from './../components/MyCourses/TableItem';

const MyCourses = () => {
	const dispatch = useDispatch();
	const { token } = useSelector((state) => state.auth);
	const { loading } = useSelector((state) => state.profile);
    const navigate = useNavigate()
	const [courses, setCourses] = useState([]);

	const fetchInstructorCourses = async () => {
		setCourses(await getInstructorCourses(dispatch, token));
	};

	useEffect( () => {
	    fetchInstructorCourses()
	}, [])
	return loading ? (
		<Spinner />
	) : (
		<div className="mx-auto w-11/12 max-w-[1000px] py-10 h-full flex-col font-inter">
            <h1 className="text-3xl font-medium text-richblack-5 flex justify-between">
                <p>My Courses</p>
                <IconButton text="Add Course" bgColor={"bg-yellow-50"} icon={"ri-add-circle-line"} textColor={"text-black"} action={()=>navigate("/dashboard/add-course")}/>
			</h1>
			{courses.length === 0 ? (
				<div className="h-full lg:max-w-[500px] mx-auto grid place-content-center text-center">
					<h1 className="text-white text-3xl font-semibold py-2">
						No Courses Created
					</h1>
					<p className="text-[#AFB2BF] font-semibold">
						You have not created any courses yet. Create a course and publish it
						to start your teaching journey with Edypros
					</p>
				</div>
			) : (
				<div className="flex flex-col border border-richblack-500 rounded mt-10">
                    <div className="flex gap-x-2 p-3 text-[#AFB2BF] uppercase border-b border-richblack-500">
                        <p className="w-[70%]">Courses</p>
                        <p className="w-[10%] text-center">Duration</p>
                        <p className="w-[10%] text-center">Price</p>
                        <p className="w-[10%] text-center">Action</p>
                    </div>
                    {
                        courses.map(course => (
                            <TableItem course={course} key={course._id}/>
                        )) 
                    }
                </div>
			)}
		</div>
	);
};

export default MyCourses;
