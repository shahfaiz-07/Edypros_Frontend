import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  step: 3,
  course: {
    "_id": "667d5cfdb8bf982d0faf4f50",
    "name": "Beatae vel exercitat",
    "description": "Expedita tempore a",
    "learnings": "Culpa sit distincti",
    "sections": [
        {
            "_id": "667d5d0db8bf982d0faf4f56",
            "name": "Debra Cain",
            "sectionOfCourse": "667d5cfdb8bf982d0faf4f50",
            "videos": [
                {
                    "_id": "667d5d2cb8bf982d0faf4f5c",
                    "title": "Aut reprehenderit d",
                    "duration": "14.96",
                    "description": "Odio rerum quia labo",
                    "url": "https://res.cloudinary.com/cloudjerry07/video/upload/v1719491883/zanrben8kr8jknuz2rha.mp4",
                    "section": "667d5d0db8bf982d0faf4f56",
                    "createdAt": "2024-06-27T12:38:04.375Z",
                    "updatedAt": "2024-06-27T12:38:04.375Z",
                    "__v": 0
                }
            ],
            "createdAt": "2024-06-27T12:37:33.595Z",
            "updatedAt": "2024-06-27T12:38:04.477Z",
            "__v": 0
        },
        {
            "_id": "667d5d31b8bf982d0faf4f65",
            "name": "Honorato Cook",
            "sectionOfCourse": "667d5cfdb8bf982d0faf4f50",
            "videos": [
                {
                    "_id": "667d5d45b8bf982d0faf4f6c",
                    "title": "Rerum sint ea ullamc",
                    "duration": "14.96",
                    "description": "Error quo ipsum ut",
                    "url": "https://res.cloudinary.com/cloudjerry07/video/upload/v1719491909/gmfaipddypo32jmnuydh.mp4",
                    "section": "667d5d31b8bf982d0faf4f65",
                    "createdAt": "2024-06-27T12:38:29.810Z",
                    "updatedAt": "2024-06-27T12:38:29.810Z",
                    "__v": 0
                }
            ],
            "createdAt": "2024-06-27T12:38:09.962Z",
            "updatedAt": "2024-06-27T12:38:29.921Z",
            "__v": 0
        }
    ],
    "ratingAndReviews": [],
    "price": 591,
    "thumbnail": "http://res.cloudinary.com/cloudjerry07/image/upload/v1719491837/lqjtxwdhqyquaqokawof.jpg",
    "tags": [
        "Tag1",
        "Tag2",
        "Tag3"
    ],
    "category": {
        "_id": "6672c8cba43bc8fd79e05ba8",
        "title": "Python",
        "description": "Python is good",
        "courses": [
            "6672ecb9b2fecf01b3971160",
            "667338fd723b4f22294e2f74",
            "66733ba0b61b966ac876c1d0",
            "667d5cfdb8bf982d0faf4f50"
        ],
        "__v": 4
    },
    "studentsEnrolled": [],
    "instructor": {
        "_id": "66730225f0c01c3e5bd5a12f",
        "firstName": "S Faizaan",
        "lastName": "Hussain",
        "email": "hussainfaizaan07@gmail.com",
        "password": "$2b$10$VtxPdprnIQp0omlwWAjrle4vrQR6L7KFPEy7D0liy1SD.XyCBsOuu",
        "accountType": "Instructor",
        "avatar": "https://api.dicebear.com/9.x/initials/svg?radius=50&fontFamily=Verdana&seed=S Faizaan%20Hussain",
        "registeredCourses": [
            "66733e6dbb36ce1d2fa302b4",
            "667cf7c5a24d46e8028e2a07",
            "667d02400e9c019e3d954320",
            "667d5cfdb8bf982d0faf4f50"
        ],
        "profile": "66730225f0c01c3e5bd5a12d",
        "courseProgress": [],
        "isActive": true,
        "createdAt": "2024-06-19T16:07:01.361Z",
        "updatedAt": "2024-06-27T12:39:49.555Z",
        "__v": 4,
        "wishlist": [],
        "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjczMDIyNWYwYzAxYzNlNWJkNWExMmYiLCJpYXQiOjE3MTk0OTE5ODksImV4cCI6MTcyMDM1NTk4OX0.nnn04DsRXQhYb851IuKtk4-2iI0PxdDZPbiW3EEq2fk"
    },
    "status": "Draft",
    "preRequisites": [
        "Sed non earum volupt",
        "Something Someone"
    ],
    "createdAt": "2024-06-27T12:37:17.737Z",
    "updatedAt": "2024-06-27T12:38:10.087Z",
    "__v": 0
},
  editCourse: false,
  paymentLoading: false,
}

const courseSlice = createSlice({
  name: "course",
  initialState,
  reducers: {
    setStep: (state, action) => {
      state.step = action.payload
    },
    setCourse: (state, action) => {
      state.course = action.payload
    },
    setEditCourse: (state, action) => {
      state.editCourse = action.payload
    },
    setPaymentLoading: (state, action) => {
      state.paymentLoading = action.payload
    },
    resetCourseState: (state) => {
      state.step = 1
      state.course = null
      state.editCourse = false
    },
  },
})

export const {
  setStep,
  setCourse,
  setEditCourse,
  setPaymentLoading,
  resetCourseState,
} = courseSlice.actions

export default courseSlice.reducer