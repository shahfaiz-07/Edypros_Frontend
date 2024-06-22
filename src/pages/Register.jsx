import React from "react";
import signupImg from "../assets/Images/signup.webp";
import { useSelector } from "react-redux";
import Spinner from "../components/common/Spinner";
import Template from "../components/Auth/Template";
const Register = () => {
	const { loading } = useSelector((state) => state.auth);
	return loading ? (
		<Spinner />
	) : (
		<Template
			title="Join the millions learning to code with StudyNotion for free"
			description1="Build skills for today, tomorrow, and beyond."
			description2="Education to future-proof your career."
			image={signupImg}
			formType="register"
		/>
	);
};

export default Register;
