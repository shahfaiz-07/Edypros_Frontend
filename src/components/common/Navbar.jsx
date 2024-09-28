import React, { useEffect, useRef, useState } from "react";
import { NavbarLinks } from "../../data/navbar-links";
import logo from "../../assets/Logo/logo-no-background.svg";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../services/operations/authAPI";
import ConfirmationModal from "./ConfirmationModal";
import { getAllCategorys } from "../../services/operations/categoriesAPI";
import { ACCOUNT_TYPE } from "../../constants";
import useOnClickOutside from "../../hooks/useOnClickOutside";
const Navbar = () => {
	const { token } = useSelector((state) => state.auth);
	const { user } = useSelector((state) => state.profile);
	const { totalItems } = useSelector((state) => state.wishlist);
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [openMenu, setOpenMenu] = useState(false);
	const [openCategories, setOpenCategories] = useState(false);
	const [subLinks, setSubLinks] = useState([]);
	const [confirmationModal, setConfirmationModal] = useState(null);
	const [loading, setLoading] = useState(true);
	const ref = useRef(null)
	const fetchSublinks = async () => {
		try {
			await getAllCategorys()
			.then((response) => {
				setSubLinks(response);
			})
			.finally(() => {
				setLoading(false);
			})
		} catch (error) {
			console.log("Cannot fetch Sublinks !!");
		}
	};
	useOnClickOutside(ref, () => setOpenMenu(false))
	useEffect(() => {
		fetchSublinks();
	}, []);
	return loading ? null : (
        <div className="border-b border-b-richblack-600 bg-[#161D29] relative">
            <div className="md:w-11/12 p-2 flex items-center justify-between md:justify-around">
                <Link to="/">
                    <img src={logo} alt="" width={140} />
                </Link>
                <ul className="gap-10 hidden md:flex">
                    {NavbarLinks.map((link, index) => (
                        <li key={index}>
                            {index === 1 ? (
                                <div className="group">
                                    <div className="text-white flex gap-3 cursor-pointer">
                                        <p>{link.title}</p>{" "}
                                        <i className="ri-arrow-down-s-line"></i>
                                    </div>
                                    <div className="invisible absolute z-10 bg-white group-hover:visible rounded py-2 w-40 flex flex-col text-sm">
                                        <div className="w-10 h-10 bg-white -z-10 absolute left-1/2 -translate-x-1/2 rotate-45 -translate-y-2"></div>
                                        {subLinks.length ? (
                                            subLinks.map((link, index) => {
                                                return (
                                                    <Link
                                                        to={`/catalog/${link._id}`}
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
                                            `${
                                                isActive
                                                    ? "text-yellow-5"
                                                    : "text-white"
                                            }`
                                        }
                                    >
                                        {link.title}
                                    </NavLink>
                                </div>
                            )}
                        </li>
                    ))}
                </ul>
                <ul
                    className={`absolute bg-pure-greys-800 bg-opacity-[95%] text-lg gap-y-5 justify-evenly  top-full flex flex-col pl-6 pr-10  py-4 z-50 right-0 w-2/3 transition-all duration-300 ${
                        openMenu ? "" : "translate-x-[150%]"
                    }`}
                    ref={ref}
                >
                    {NavbarLinks.map((link, index) => (
                        <li key={index}>
                            {index === 1 ? (
                                <>
                                    <div
                                        className="mb-2"
                                        onClick={() =>
                                            setOpenCategories((prev) => !prev)
                                        }
                                    >
                                        <div className="text-white flex gap-3 cursor-pointer">
                                            <p>{link.title}</p>{" "}
                                            <i className="ri-arrow-down-s-line"></i>
                                        </div>
                                        <div className="invisible absolute z-10 bg-white group-hover:visible rounded py-2 w-40 flex flex-col text-sm">
                                            <div className="w-10 h-10 bg-white -z-10 absolute left-1/2 -translate-x-1/2 rotate-45 -translate-y-2"></div>
                                        </div>
                                    </div>
                                    {openCategories && (
                                        <div className="text-richblack-5 flex flex-col gap-y-1 text-sm">
                                            {subLinks.length ? (
                                                subLinks.map((link, index) => {
                                                    return (
                                                        <Link
                                                            to={`/catalog/${link._id}`}
                                                            key={index}
                                                            className="py-2"
                                                            onClick={() =>
                                                                setOpenMenu(
                                                                    false
                                                                )
                                                            }
                                                        >
                                                            {link.title}
                                                        </Link>
                                                    );
                                                })
                                            ) : (
                                                <div></div>
                                            )}
                                        </div>
                                    )}
                                </>
                            ) : (
                                <div className="">
                                    <NavLink
                                        to={link.path}
                                        className={({ isActive }) =>
                                            `${
                                                isActive
                                                    ? "text-yellow-5"
                                                    : "text-white"
                                            }`
                                        }
                                        onClick={() => setOpenMenu(false)}
                                    >
                                        {link.title}
                                    </NavLink>
                                </div>
                            )}
                        </li>
                    ))}
                    {token ? (
                        <>
                            <Link
                                to="/dashboard/my-profile"
                                className="text-richblack-5 border-t pt-5 flex gap-x-1"
                                onClick={() => setOpenMenu(false)}
                            >
                                <i className="ri-dashboard-horizontal-fill"></i>{" "}
                                Dashboard
                            </Link>
                            <li
                                className="text-richblack-5 flex gap-x-2"
                                onClick={() => {
                                    setOpenMenu(false);
                                    setConfirmationModal({
                                        text1: "Are You Sure ?",
                                        text2: "You will be logged out of your Account",
                                        btn1Text: "Logout",
                                        btn2Text: "Cancel",
                                        btn1Handler: () =>
                                            dispatch(logout(token, navigate)),
                                        btn2Handler: () =>
                                            setConfirmationModal(null),
                                    });
                                }}
                            >
                                <i className="ri-logout-box-line"></i> Logout
                            </li>
                        </>
                    ) : (
                        <>
                            <Link
                                to="/login"
                                className="text-richblack-5 border-t pt-5"
                                onClick={() => setOpenMenu(false)}
                            >
                                Login
                            </Link>
                            <Link
                                to="/register"
                                className="text-richblack-5"
                                onClick={() => setOpenMenu(false)}
                            >
                                Register
                            </Link>
                        </>
                    )}
                </ul>

                <div className="md:hidden relative flex items-center gap-x-4">
                    {token &&
                        user &&
                        user.accountType === ACCOUNT_TYPE.STUDENT && (
                            <div className="relative">
                                <p className="w-4 left-1/2 bg-yellow-50 aspect-square text-[10px] grid place-content-center text-black rounded-full font-extrabold absolute">
                                    {totalItems}
                                </p>
                                <Link to={"/dashboard/wishlist"}>
                                    <i className="ri-bookmark-line text-2xl text-richblack-5"></i>
                                </Link>
                            </div>
                        )}
                    {!token && (
                        <i
                            className="ri-menu-3-line text-2xl text-richblack-5"
                            onClick={() => {
                                setOpenMenu((prev) => !prev);
                                setOpenCategories(false);
                            }}
                        ></i>
                    )}
                    {token && (
                        <img
                            src={user?.avatar}
                            alt=""
                            className="aspect-square w-10 object-cover rounded-full cursor-pointer"
                            onClick={() => {
                                setOpenMenu((prev) => !prev);
                                setOpenCategories(false);
                            }}
                        />
                    )}
                </div>
                <div className="hidden md:block">
                    {token ? (
                        <div className="flex gap-5 items-center h-full text-white">
                            {user.accountType === ACCOUNT_TYPE.STUDENT && (
                                <div className="relative">
                                    <p className="w-3 left-1/2 bg-yellow-50 aspect-square text-[8px] grid place-content-center text-black rounded-full font-extrabold absolute">
                                        {totalItems}
                                    </p>
                                    <Link to={"/dashboard/wishlist"}>
                                        <i className="ri-bookmark-line text-lg"></i>
                                    </Link>
                                </div>
                            )}
                            <div className="group relative">
                                <img
                                    src={user?.avatar}
                                    alt=""
                                    className="aspect-square w-10 object-cover rounded-full cursor-pointer"
                                />
                                <div className="invisible group-hover:visible py-2 absolute z-10 bg-richblack-700 rounded -translate-x-1/2 left-[14px] translate-y-2">
                                    <div className="absolute -z-10 w-10 h-10 rotate-45 -translate-y-2 bg-richblack-700 left-1/2 -translate-x-1/2"></div>
                                    <Link
                                        to="/dashboard/my-profile"
                                        className="px-4 py-2 flex gap-3 hover:bg-richblack-600"
                                    >
                                        <i className="ri-dashboard-horizontal-fill"></i>{" "}
                                        Dashboard
                                    </Link>
                                    <div
                                        onClick={() =>
                                            setConfirmationModal({
                                                text1: "Are You Sure ?",
                                                text2: "You will be logged out of your Account",
                                                btn1Text: "Logout",
                                                btn2Text: "Cancel",
                                                btn1Handler: () =>
                                                    dispatch(
                                                        logout(token, navigate)
                                                    ),
                                                btn2Handler: () =>
                                                    setConfirmationModal(null),
                                            })
                                        }
                                        className="px-4 py-2 flex gap-3 hover:bg-richblack-600 cursor-pointer"
                                    >
                                        <i className="ri-logout-box-line"></i>{" "}
                                        Logout
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
            {confirmationModal && (
                <ConfirmationModal
                    modalData={confirmationModal}
                    setConfirmationModal={setConfirmationModal}
                />
            )}
        </div>
    );
};

export default Navbar;
