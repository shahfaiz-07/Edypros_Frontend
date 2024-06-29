import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getCategoryPageDetails } from "../services/operations/categoriesAPI";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../components/common/Spinner";
import CourseSlider from "../components/Catalog/CourseSlider"

const Catalog = () => {
	const { categoryId } = useParams();
    const {loading} = useSelector(state => state.profile)
    const [courses, setCourses] = useState([])
    const [newCourses, setNewCourses] = useState([])
    const [showNewCourses, setShowNewCourses] = useState(false)
    const [categoryData, setCategoryData] = useState({})
    const [otherCategoryCourses, setOtherCategoryCourses] = useState([])
    const [otherCategory, setOtherCategory] = useState("")
    const [topCourses, setTopCourses] = useState([])
    const dispatch = useDispatch()

    const fetchCategoryPageDetails = async () => {
        const pageData = await getCategoryPageDetails(dispatch, categoryId);
        setCategoryData({title: pageData?.courses?.title, description: pageData?.courses?.description})
        setCourses(pageData?.courses?.courses)
        setNewCourses(pageData?.newCourses)
        setOtherCategoryCourses(pageData?.differentCategoryData?.courses)
        setTopCourses(pageData?.topSellers)
        setOtherCategory(pageData?.differentCategoryData?.title)
    }
    useEffect( () => {
        fetchCategoryPageDetails()
    }, [categoryId])
	return (
		loading
        ?
        <Spinner/>
        :
        <div className="pb-5">
			<div className="mx-auto font-inter">
				<div className=" bg-[#161D29] p-3 lg:p-6">
                    <div className="w-11/12 mx-auto flex flex-col gap-y-2">
                        <h1 className="text-white capitalize text-2xl font-semibold">{categoryData.title}</h1>
                        <p className="text-richblack-300 text-sm">{categoryData.description}</p>
                    </div>
				</div>
                <div className="w-11/12 max-w-maxContent flex flex-col mx-auto">
                    <div className="py-3 md:px-6">
                        <h2 className="text-white text-xl font-semibold mb-2">Courses to get you started</h2>
                        <div className="border-b border-richblack-500 my-2 flex text-white text-sm text-center">
                            <p onClick={()=>setShowNewCourses(false)} className={`py-2 w-1/2 md:w-40 cursor-pointer ${showNewCourses ? "" : "text-yellow-50 bg-yellow-50 bg-opacity-20"}`}>Most Popular</p>
                            <p onClick={()=>setShowNewCourses(true)} className={`py-2 w-1/2 md:w-40 cursor-pointer ${showNewCourses ? "text-pink-300 bg-pink-300 bg-opacity-20" : ""}`}>New Courses</p>
                        </div>
                        <CourseSlider courses={(showNewCourses) ? newCourses : courses} autoplay={false}/>
                    </div>
                    <div className="py-3 md:px-6">
                        <h2 className="text-white text-xl font-semibold border-b border-richblack-500 pb-1">Top Courses in {otherCategory}</h2>
                        <CourseSlider courses={otherCategoryCourses} autoplay={false}/>
                    </div>
                    <div className="py-3 md:px-6">
                        <h2 className="text-white text-xl font-semibold border-b border-richblack-500 pb-1">Here are some top Sellers</h2>
                        <CourseSlider courses = {topCourses} autoplay={true}/>
                    </div>
                </div>
			</div>
		</div>
	);
};

export default Catalog;
