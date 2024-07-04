import React, { useEffect, useState } from "react";
import { sidebarLinks } from "./../../data/dashboard-links";
import SidebarLink from "./SidebarLink";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../services/operations/authAPI";
import { useNavigate } from "react-router";
import ConfirmationModal from "../common/ConfirmationModal";

const Sidebar = () => {
  const {user} = useSelector((state) => state.profile)
  const {token} = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [confirmationModal, setConfirmationModal] = useState(null);
  // useEffect(() => {
  //   console.log(user)
  // }, [])
	return (
		<div className="h-full w-full py-5 md:py-10 bg-richblack-900 bg-opacity-90 md:bg-transparent">
			<div className="flex flex-col">
				{sidebarLinks.map((link) => {
					if (link.type && user?.accountType !== link.type) return null;
					return <SidebarLink key={link.id} path={link.path} icon={link.icon} text={link.name} />;
				})}
        <div className="border-b border-richblack-500 my-8"></div>

        <SidebarLink path="/dashboard/settings" icon="ri-settings-4-line" text="Setting"/>
        <div onClick={ () => setConfirmationModal({
                            text1: "Are You Sure ?",
                            text2: "You will be logged out of your Account",
                            btn1Text: "Logout",
                            btn2Text:"Cancel",
                            btn1Handler: () => dispatch(logout(token, navigate)),
                            btn2Handler: () => setConfirmationModal(null),
                        })} className="border-l-2 border-transparent cursor-pointer px-4 py-2 block text-white">
        <i className="ri-logout-box-line"></i> Logout
        </div>

			</div>
      
      {confirmationModal && <ConfirmationModal modalData={confirmationModal} setConfirmationModal={setConfirmationModal}/>}
		</div>
	);
};

export default Sidebar;
