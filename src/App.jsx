import { useEffect } from "react"
import axios from "axios"
import { Routes, Route } from "react-router"
import Home from "./pages/Home"
import Footer from './components/common/Footer';
import 'remixicon/fonts/remixicon.css'
function App() {

  return (
    <>
    <div className="w-screen min-h-screen bg-richblack-900 flex flex-col font-inter">
    <Routes>
        <Route path="/" element={<Home/>}/>
      </Routes>
      <Footer />
    </div>
      
    </>
  )
}

export default App
