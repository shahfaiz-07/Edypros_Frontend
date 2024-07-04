import React, { useRef, useState } from 'react'
import Sidebar from './../components/Dashboard/Sidebar';
import { Outlet } from 'react-router';
import useOnClickOutside from '../hooks/useOnClickOutside';

const Dashboard = () => {
  const [openDashboardMenu, setOpenDashboardMenu] = useState(false)
  const ref = useRef(null)
  useOnClickOutside(ref, () => setOpenDashboardMenu(false))
  return (
    <div className='min-h-[calc(100vh-3.5rem)] max-w-maxContent flex-grow font-inter  w-11/12 md:w-full mx-auto'>
      <button className='px-3 py-2 bg-yellow-50 rounded text-sm mt-4 font-bold md:hidden' onClick={ () => setOpenDashboardMenu(prev => !prev)}>Dashboard Menu</button>
      <div className='flex flex-col md:flex-row h-full relative' onClick={ () => setOpenDashboardMenu(false)}>
        <div className={`md:w-[20%] w-full md:h-full transition-all duration-200 absolute md:static z-50 ${openDashboardMenu ? "" : "-translate-x-[150%] md:translate-x-0"}`} ref={ref}>
        <Sidebar />
        </div>
        <div className='w-full md:w-[80%]'>
          <Outlet/>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
