import { Routes, Route } from "react-router";
import Home from "./pages/Home";
import Footer from "./components/common/Footer";
import "remixicon/fonts/remixicon.css";
import Navbar from "./components/common/Navbar";
import ResetPassword from "./pages/ResetPassword";
import PublicRoute from "./components/Auth/PublicRoute";
import Register from "./pages/Register";
import Login from "./pages/Login";
import UpdatePassword from "./components/common/UpdatePassword";
import { Toaster } from "react-hot-toast";
import VerifyEmail from "./pages/VerifyEmail";
import AboutUs from "./pages/AboutUs";
import ProtectedRoute from "./components/Auth/ProtectedRoute";
import Dashboard from "./pages/Dashboard";
import MyProfile from "./components/Dashboard/MyProfile";
import Settings from "./pages/Settings";
import Contact from "./pages/Contact";
import RegisteredCourses from "./pages/RegisteredCourses";
import StudentProtected from "./components/Auth/StudentProtected";
import Wishlist from "./pages/Wishlist";
import AddCourse from "./pages/AddCourse";
import InstructorProtected from './components/Auth/InstructorProtected';
import MyCourses from "./pages/MyCourses";
import EditCourse from "./pages/EditCourse";
function App() {
	return (
		<>
			<div className="w-screen min-h-screen bg-richblack-900 flex flex-col font-inter">
				<Navbar />
				<Toaster position="top-center" reverseOrder={false} />
				<Routes>
					<Route
						path="forgot-password"
						element={
							<PublicRoute>
								<ResetPassword />
							</PublicRoute>
						}
					/>
					<Route
						path="/login"
						element={
							<PublicRoute>
								<Login />
							</PublicRoute>
						}
					/>
					<Route
						path="/register"
						element={
							<PublicRoute>
								<Register />
							</PublicRoute>
						}
					/>
					<Route
						path="/update-password/:token"
						element={
							<PublicRoute>
								<UpdatePassword />
							</PublicRoute>
						}
					/>
					<Route
						path="/verify-otp"
						element={
							<PublicRoute>
								<VerifyEmail />
							</PublicRoute>
						}
					/>
					<Route path="/about" element={<AboutUs />} />
					<Route path="/contact" element={<Contact />} />
					<Route
						element={
							<ProtectedRoute>
								<Dashboard />
							</ProtectedRoute>
						}
					>
						<Route path="dashboard/my-profile" element={<MyProfile />} />
						<Route path="dashboard/settings" element={<Settings />} />
						<Route path="dashboard/registered-courses" 
						element={
							<StudentProtected>
								<RegisteredCourses/>
							</StudentProtected>
						}/>
						<Route path="dashboard/wishlist" 
						element={
							<StudentProtected>
								<Wishlist/>
							</StudentProtected>
						}/>
						<Route path="dashboard/add-course" 
						element={
							<InstructorProtected>
								<AddCourse/>
							</InstructorProtected>
						}/>
						<Route path="dashboard/my-courses" 
						element={
							<InstructorProtected>
								<MyCourses/>
							</InstructorProtected>
						}/>
						<Route path="dashboard/edit-course/:courseId" 
						element={
							<InstructorProtected>
								<EditCourse/>
							</InstructorProtected>
						}/>
					</Route>
					<Route path="/" element={<Home />} />
				</Routes>
				{/* <Footer /> */}
			</div>
		</>
	);
}

export default App;
