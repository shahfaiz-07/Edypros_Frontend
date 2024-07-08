import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PreRequisites from "./PreRequisites";
import { useForm } from "react-hook-form";
import { setCourse, setStep } from "../../../features/courses/courseSlice";
import Spinner from "./../../common/Spinner";
import TagInput from "./TagInput";
import Thumbnail from "./Thumbnail";
import { getAllCategorys } from "../../../services/operations/categoriesAPI";
import { COURSE_STATUS } from "../../../constants";
import {
	createCourse,
	updateCourseData,
	updateCourseThumbnail,
} from "../../../services/operations/courseAPI";
import toast from "react-hot-toast";
import ISO6391 from 'iso-639-1';

const CourseInformationForm = () => {
	const dispatch = useDispatch();
	const { token } = useSelector((state) => state.auth);
	const { course, editCourse } = useSelector((state) => state.course);
	const [loading, setLoading] = useState(false);
	const [courseCategories, setCourseCategories] = useState([]);
	const [languages, setLanguages] = useState([])

	const {
		register,
		handleSubmit,
		setValue,
		getValues,
		formState: { errors },
	} = useForm();

	const fetchCourseCategories = async () => {
		setLoading(true);
		try {
			const result = await getAllCategorys();
			// console.log(result)
			setCourseCategories(result);
		} catch (error) {
			console.log("ERROR WHILE FETCHING CATEGORIES .....", error);
		}
		setLoading(false);
	};
	useEffect(() => {
		setLanguages(ISO6391.getAllNames());
		fetchCourseCategories();
		if (editCourse) {
			setValue("courseTitle", course.name);
			setValue("courseDescription", course.description);
			setValue("courseLanguage", course.language)
			setValue("coursePrice", Number(course.price));
			setValue("courseTags", course.tags);
			setValue("courseLearnings", course.learnings);
			setValue("courseCategory", course.category);
			setValue("coursePreRequisites", course.preRequisites);
			setValue("courseThumbnail", course.thumbnail);
		}
	}, []);

	const isFormUpdated = () => {
		const currentValues = getValues();
		if (
			currentValues.courseTitle !== course.name ||
			currentValues.courseDescription !== course.description ||
			currentValues.coursePrice !== course.price ||
			currentValues.courseTags.toString() !== course.tags.toString() ||
			currentValues.courseLearnings !== course.learnings ||
			currentValues.courseCategory !== course.category ||
			currentValues.courseThumbnail !== course.thumbnail ||
			currentValues.coursePreRequisites.toString() !==
				course.preRequisites.toString()
		)
			return true;
		else return false;
	};

	const onSubmit = async (data) => {
		if (editCourse) {
			if (!isFormUpdated()) {
				toast.error("No Changes Were Made !!");
				dispatch(setStep(2));
			} else {
				const currentValues = getValues();
				if (
					currentValues.courseTitle !== course.name ||
					currentValues.courseDescription !== course.description ||
					currentValues.coursePrice !== course.price ||
					currentValues.courseTags.toString() !== course.tags.toString() ||
					currentValues.courseLearnings !== course.learnings ||
					currentValues.courseCategory !== course.category ||
					currentValues.coursePreRequisites.toString() !==
						course.preRequisites.toString()
				) {
					const formData = {
						name: currentValues.courseTitle,
						description: currentValues.courseDescription,
						price: currentValues.coursePrice,
						tags: JSON.stringify(currentValues.courseTags),
						learnings: currentValues.courseLearnings,
						category: currentValues.courseCategory,
						preRequisites: JSON.stringify(currentValues.coursePreRequisites),
					};
					await updateCourseData(dispatch, formData, course._id, token);
				}
				if (currentValues.courseThumbnail !== course.thumbnail) {
                    //thumbnail update logic
					const formData = new FormData();
					formData.append("thumbnail", data.courseThumbnail)
					await updateCourseThumbnail(dispatch, formData, course._id, token)
				}
				toast.success("Changes were made !!");
                dispatch(setStep(2))
			}
		} else {
			console.log(data);
			const formData = new FormData();
			formData.append("name", data.courseTitle);
			formData.append("description", data.courseDescription);
			formData.append("price", data.coursePrice);
			formData.append("learnings", data.courseLearnings);
			formData.append("category", data.courseCategory);
			formData.append(
				"preRequisites",
				JSON.stringify(data.coursePreRequisites)
			);
			formData.append("status", COURSE_STATUS.DRAFT);
			formData.append("tags", JSON.stringify(data.courseTags));
			formData.append("thumbnail", data.courseThumbnail);
			formData.append("language", data.courseLanguage)
			const response = await createCourse(formData, token);
			if (response) {
				dispatch(setStep(2));
				dispatch(setCourse(response));
			}
			console.log("PAGE 1 RESPONSE :", response);
		}
	};
	return loading ? (
		<Spinner />
	) : (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className="space-y-8 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-3 md:p-6"
		>
			<div className="flex flex-col space-y-2">
				<label className="text-sm text-richblack-5" htmlFor="courseTitle">
					Course Title<sup className="text-pink-200">*</sup>
				</label>
				<input
					id="courseTitle"
					placeholder="Enter Course Title"
					{...register("courseTitle", { required: true })}
					className="form-style w-full text-sm"
				/>
				{errors.courseTitle && (
					<span className="ml-2 text-xs tracking-wide text-pink-200">
						Course Title is Required**
					</span>
				)}
			</div>

			<div className="flex flex-col space-y-2">
				<label className="text-sm text-richblack-5" htmlFor="courseDescription">
					Course Short Description<sup className="text-pink-200">*</sup>
				</label>
				<textarea
					id="courseDescription"
					placeholder="Enter Description"
					{...register("courseDescription", { required: true })}
					className="form-style resize-x-none min-h-[130px] w-full no-scrollbar"
				/>
				{errors.courseDescription && (
					<span className="ml-2 text-xs tracking-wide text-pink-200">
						Course Description is required**
					</span>
				)}
			</div>

			<div className="relative flex flex-col space-y-2">
				<label className="text-sm text-richblack-5" htmlFor="coursePrice">
					Course Price<sup className="text-pink-200">*</sup>
				</label>
				<input
					id="coursePrice"
					// type='number'
					placeholder="Enter Course Price..."
					{...register("coursePrice", {
						required: true,
						valueAsNumber: true,
						value: 0,
					})}
					className="form-style w-full !pl-12"
				/>
				<i className="ri-money-rupee-circle-line absolute translate-y-[50%] left-2 text-richblack-400 text-[25px] md:text-[30px]"></i>
				{errors.coursePrice && (
					<span className="ml-2 text-xs tracking-wide text-pink-200">
						Course Price is Required**
					</span>
				)}
			</div>

			<div className="flex flex-col space-y-2">
				<label className="text-sm text-richblack-5" htmlFor="courseCategory">
					Course Category<sup className="text-pink-200">*</sup>
				</label>
				<select
					disabled={editCourse}
					className="form-style w-full"
					id="courseCategory"
					defaultValue=""
					{...register("courseCategory", { required: true })}
				>
					<option value="" disabled>
						Choose a Category
					</option>

					{!loading &&
						courseCategories.map((category, index) => (
							<option key={index} value={category?._id}>
								{category?.title}
							</option>
						))}
				</select>
				{errors.courseCategory && (
					<span className="ml-2 text-xs tracking-wide text-pink-200">
						Course Category is Required
					</span>
				)}
			</div>

			<div className="flex flex-col space-y-2">
				<label className="text-sm text-richblack-5" htmlFor="courseLanguage">
					Course Language<sup className="text-pink-200">*</sup>
				</label>
				<select
					disabled={editCourse}
					className="form-style w-full"
					id="courseLanguage"
					defaultValue=""
					{...register("courseLanguage", { required: true })}
				>
					<option value="" disabled>
						Choose a Language
					</option>

					{!loading &&
						languages.map((language, index) => (
							<option key={index} value={language}>
								{language}
							</option>
						))}
				</select>
				{errors.courseLanguage && (
					<span className="ml-2 text-xs tracking-wide text-pink-200">
						Course Language is Required
					</span>
				)}
			</div>

			{/* custom component for handling tags input */}
			<TagInput
				label="Tags"
				name="courseTags"
				placeholder="Enter tags and press enter"
				register={register}
				errors={errors}
				setValue={setValue}
			/>

			{/*component for uploading and showing preview of media */}
			<Thumbnail
				name={"courseThumbnail"}
				label={"CourseImage"}
				register={register}
				errors={errors}
				setValue={setValue}
			/>

			{/*     Benefits of the Course */}
			<div className="flex flex-col space-y-2">
				<label htmlFor="courseLearnings" className="text-sm text-richblack-5">
					Learnings of the course<sup className="text-pink-200">*</sup>
				</label>
				<textarea
					id="courseLearnings"
					placeholder="Enter Learnings of the course no-scrollbar"
					{...register("courseLearnings", { required: true })}
					className="form-style resize-x-none min-h-[130px] w-full no-scrollbar"
				/>
				{errors.courseLearnings && (
					<span className="ml-2 text-xs tracking-wide text-pink-200">
						Learnings of the course are required**
					</span>
				)}
			</div>

			<PreRequisites
				name="coursePreRequisites"
				label="Pre-Requisites/Instructions"
				register={register}
				errors={errors}
				setValue={setValue}
			/>

			<div className="flex justify-end gap-x-2">
				{editCourse && (
					<button
						onClick={() => dispatch(setStep(2))}
						className=" text-[10px] md:text-sm p-2 font-semibold rounded-md flex items-center gap-x-2 bg-richblack-300"
					>
						Continue Without Saving
					</button>
				)}

				<button
					type="submit"
					className="bg-yellow-50 px-4 py-2 rounded font-semibold hover:scale-95 transition-all duration-100"
				>
					{editCourse ? "Save Changes" : "Next"}
				</button>
			</div>
		</form>
	);
};

export default CourseInformationForm;
