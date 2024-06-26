import React, { useEffect, useState } from "react";
import { NavbarLinks } from "../../data/navbar-links";
import logo from "../../assets/Logo/logo-no-background.svg";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../services/operations/authAPI";
import ConfirmationModal from "./ConfirmationModal";
import { getAllCategorys } from "../../services/operations/categoriesAPI";
const Navbar = () => {
	const { token } = useSelector((state) => state.auth);
	const { user } = useSelector((state) => state.profile);

	// const { totalItems } = useSelector((state) => state.cart);
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const [subLinks, setSubLinks] = useState([]);
	const [confirmationModal, setConfirmationModal] = useState(null);
	const fetchSublinks = async () => {
		try {
			const result = await getAllCategorys()
			// console.log(result.data.data);
			setSubLinks(result);
		} catch (error) {
			console.log("Cannot fetch Sublinks !!");
		}
	};

	useEffect(() => {
		fetchSublinks();
	}, []);
	return (
		<div className="border-b border-b-richblack-700">
			<div className="w-11/12 p-2 flex max-w-maxContent items-center justify-around">
				<Link to="/">
					<img src={logo} alt="" width={140} />
				</Link>
				<ul className="flex gap-10">
					{NavbarLinks.map((link, index) => (
						<li key={index}>
							{index === 1 ? (
								<div className="group">
									<div className="text-white flex gap-3 cursor-pointer">
										<p>{link.title}</p> <i className="ri-arrow-down-s-line"></i>
									</div>
									<div className="invisible absolute z-10 bg-white group-hover:visible rounded py-2 w-40 flex flex-col text-sm">
										{subLinks.length ? (
											subLinks.map((link, index) => {
												return (
													<Link
														to={link.title.toLowerCase().replace(" ", "-")}
														key={index}
														className="hover:bg-richblack-25 px-4 py-2"
													>
														{link.title}
													</Link>
												);
											})
										) : (
											<div></div>
										)}
									</div>
								</div>
							) : (
								<div>
									<NavLink
										to={link.path}
										className={({ isActive }) =>
											`${isActive ? "text-yellow-5" : "text-white"}`
										}
									>
										{link.title}
									</NavLink>
								</div>
							)}
						</li>
					))}
				</ul>
				<div>
					{token ? (
						// <div>
						// 	<button onClick={() => dispatch(logout(navigate))} className="px-4 py-2 border rounded-md bg-yellow-50">
						// 		Logout
						// 	</button>
						// </div>
						<div className="flex gap-5 items-center h-full text-white">
							<div>
								<i className="ri-search-line"></i>
							</div>
							<div>
								<i className="ri-shopping-cart-line"></i>
							</div>
							<div className="group relative">
								<img
									src={user?.avatar}
									alt=""
									className="aspect-square w-7 object-cover rounded-full cursor-pointer"
								/>
								<div className="invisible group-hover:visible py-2 absolute z-10 bg-richblack-800 rounded border border-richblack-5">
									<Link
										to="/dashboard/my-profile"
										className="px-4 py-2 flex gap-3 hover:bg-richblack-700"
									>
										<i className="ri-dashboard-horizontal-fill"></i> Dashboard
									</Link>
									<div
										onClick={() =>
											setConfirmationModal({
												text1: "Are You Sure ?",
												text2: "You will be logged out of your Account",
												btn1Text: "Logout",
												btn2Text: "Cancel",
												btn1Handler: () => dispatch(logout(token, navigate)),
												btn2Handler: () => setConfirmationModal(null),
											})
										}
										className="px-4 py-2 flex gap-3 hover:bg-richblack-700 cursor-pointer"
									>
										<i className="ri-logout-box-line"></i> Logout
									</div>
								</div>
							</div>
						</div>
					) : (
						<div className="flex gap-5">
							<NavLink
								to="/login"
								className={({ isActive }) =>
									`${
										isActive
											? "text-black bg-white"
											: "text-white bg-richblack-800"
									}
                                        px-4 py-2 border border-richblack-600 rounded-md`
								}
							>
								Login
							</NavLink>
							<NavLink
								to="/register"
								className={({ isActive }) =>
									`${
										isActive
											? "text-black bg-white"
											: "text-white bg-richblack-800"
									}
                                        px-4 py-2 border border-richblack-600 rounded-md`
								}
							>
								Register
							</NavLink>
						</div>
					)}
				</div>
			</div>
			{confirmationModal && <ConfirmationModal modalData={confirmationModal} setConfirmationModal={setConfirmationModal}/>}
		</div>
	);
};

export default Navbar;
