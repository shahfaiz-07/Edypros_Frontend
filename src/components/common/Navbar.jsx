import React, { useEffect, useState } from "react";
import { NavbarLinks } from "../../data/navbar-links";
import logo from "../../assets/Logo/logo-no-background.svg";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { apiConnector } from "../../services/apiConnector";
import { categories } from "../../services/apis";
import { logout } from "../../services/operations/authAPI";
const Navbar = () => {
	const { token } = useSelector((state) => state.auth);
	const { user } = useSelector((state) => state.profile);
	const { totalItems } = useSelector((state) => state.cart);
	const navigate = useNavigate()
	const dispatch = useDispatch()

	const [subLinks, setSubLinks] = useState([]);

	const fetchSublinks = async () => {
		try {
			const result = await apiConnector("GET", categories.CATEGORIES_API);
			console.log(result.data.data);
			setSubLinks(result.data.data);
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
										{
											subLinks.length
											?
											(subLinks.map( (link, index) => {
												return (
													<Link to={link.title.toLowerCase().replace(" ", "-")} key={index} className="hover:bg-richblack-25 px-4 py-2">
														{link.title}
													</Link>
												)
											}))
											:
											(<div>

											</div>)
										}
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
						<div>
							<button onClick={() => dispatch(logout(navigate))} className="px-4 py-2 border rounded-md bg-yellow-50">
								Logout
							</button>
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
		</div>
	);
};

export default Navbar;
