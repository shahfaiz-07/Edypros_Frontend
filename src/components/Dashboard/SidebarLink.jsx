import React from 'react'
import { NavLink } from 'react-router-dom';

const SidebarLink = ({path, text, icon}) => {
  return (
    <div>

    <NavLink to={path} className={({isActive})=>`border-l-2 ${(isActive)?"border-yellow-50 bg-yellow-50 bg-opacity-20 text-yellow-50":"text-white border-transparent"} px-4 py-2 block`}>
        <i className={icon}></i> {text}
    </NavLink>
    </div>
  )
}

export default SidebarLink