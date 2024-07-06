import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const PreRequisites = ({name, label, register, errors, setValue}) => {
	const [preRequisites, setPreRequisites] = useState([]);
	const [currentPreRequisite, setCurrentPreRequisite] = useState("");
	const {course, editCourse} = useSelector(state => state.course)

	const addPreRequisite = (e) => {
        e.preventDefault()
		if (currentPreRequisite) {
			setPreRequisites((prev) => [...prev, currentPreRequisite.trim()]);
			setCurrentPreRequisite("");
		}
	};
	const clearPreRequisite = (index) => {
        const newPreRequisites = [...preRequisites];
		newPreRequisites.splice(index, 1);
		setPreRequisites(newPreRequisites)
	};

	useEffect(() => {
		register(name, {
			required: true
		})
		if(editCourse) {
			setPreRequisites(course?.preRequisites);
			setValue(name, course?.preRequisites);
		}
	}, [])

	useEffect(() => {
		setValue(name, preRequisites)
	}, [preRequisites, addPreRequisite, clearPreRequisite])
	return (
		<div className="flex flex-col space-y-2">
			<label className="text-sm text-richblack-5" htmlFor={name}>
				{label}<sup className="text-pink-200">*</sup>
			</label>
			<input
				id={name}
				placeholder="Enter Course Pre-Requisites..."
				value={currentPreRequisite}
				onChange={(e) => setCurrentPreRequisite(e.target.value)}
				className="form-style w-full"
			/>
			<button className="bg-yellow-50 px-3 py-1 rounded font-semibold self-end" onClick={addPreRequisite}>
				Add
			</button>
			<ul className="list-disc list-inside text-richblack-25 ">
                {
                    preRequisites.map((preRequisite, index) => (
                        <li key={index} className="text-sm">
                            <span className="italic py-1 mr-3">{preRequisite}</span>
                            <span className="text-richblack-100 cursor-pointer rounded" onClick={() => clearPreRequisite(index)}>clear</span>
                        </li>
                    ))
                }
            </ul>
			{errors[name] && (
            <span className='ml-2 text-xs tracking-wide text-pink-200'>
                {label} is required
            </span>
        	)}
		</div>
	);
};

export default PreRequisites;
