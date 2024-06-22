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
					<Route path="/" element={<Home />} />
				</Routes>
				{/* <Footer /> */}
			</div>
		</>
	);
}

export default App;
