import React, { useEffect, useState } from 'react'
import { getInstructorDashboardData } from '../services/operations/profileAPI';
import { useDispatch, useSelector } from 'react-redux';

const InstructorDashboard = () => {
    const [dashboardData, setDashboardData] = useState({
        "publishedCourses": [
            {
                "_id": "667ee99de17dee1fe1a7d333",
                "name": "Introduction to ML with updated title",
                "description": "This is the course description of the machine learning course which is very long and should have text ellipsis",
                "studentsEnrolled": 1,
                "courseRevenue": 2999,
                "price": 2999,
                "category": {
                    "title": "Machine Learning",
                    "color": "FFC857"
                },
                "ratingAndReviews": []
            },
            {
                "_id": "667eeaf2e17dee1fe1a7d373",
                "name": "Beatae enim earum ut",
                "description": "Voluptate deleniti o",
                "studentsEnrolled": 1,
                "courseRevenue": 199,
                "price": 199,
                "category": {
                    "title": "Python",
                    "color": "AF1B3F"
                },
                "ratingAndReviews": []
            },
            {
                "_id": "66827898f0defa745d029e1b",
                "name": "Consequuntur consequ",
                "description": "Velit molestiae sae",
                "studentsEnrolled": 1,
                "courseRevenue": 438,
                "price": 438,
                "category": {
                    "title": "Web Development",
                    "color": "F95738"
                },
                "ratingAndReviews": [
                    {
                        "_id": "668517e2f73b536612376edc",
                        "reviewedBy": "6673d6c4df9a462bb26109a5",
                        "rating": 5,
                        "review": "Very good course",
                        "reviewed": "66827898f0defa745d029e1b",
                        "createdAt": "2024-07-03T09:20:34.092Z",
                        "updatedAt": "2024-07-03T09:20:34.092Z",
                        "__v": 0
                    }
                ]
            }
        ],
        "draftCourses": []
    });
    const dispatch = useDispatch()
    const { token } = useSelector(state => state.auth)

    const fetchInstructorDashboardData = async () => {
        const response = await getInstructorDashboardData(dispatch, token)
        setDashboardData(response)
    }
    // useEffect( () => {
    //     fetchInstructorDashboardData()
    //     console.log(dashboardData)
    // }, [])
  return (
    <div className='text-richblack-5 w-11/12 mx-auto my-5'>
      <div className='flex'>
        <div className='w-[60%]'>
            CHART DATA
        </div>
        <div className='w-[40%] bg-richblack-800'>
            <h2 className='text-lg'>Statistics</h2>
        </div>
      </div>
    </div>
  )
}

export default InstructorDashboard
