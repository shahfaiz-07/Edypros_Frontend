import React from 'react'
import { useSelector } from 'react-redux'
import Template from '../components/Auth/Template'
import loginImg from "../assets/Images/login.webp"

const Login = () => {
    // const {loading} = useSelector((state) => state.auth)
  return (
    <div>
      <Template
      title="Welcome Back"
      description1="Build skills for today, tomorrow, and beyond."
      description2="Education to future-proof your career."
      image={loginImg}
      formType="login"
    />
    </div>
  )
}

export default Login
