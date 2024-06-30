import React from 'react'
import Sidebar from './../components/Dashboard/Sidebar';
import { Outlet } from 'react-router';

const Dashboard = () => {
  return (
    <div className='min-h-[calc(100vh-3.5rem)] max-w-maxContent flex-grow'>
      <div className='flex h-full'>
        <div className='w-[20%] h-full'>
        <Sidebar />
        </div>
        <div className='w-[80%]'>
          <Outlet/>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
