import { ACCOUNT_TYPE } from "../constants";
export const sidebarLinks = [
  {
    id: 1,
    name: "My Profile",
    path: "/dashboard/my-profile",
    icon: "ri-user-line",
  },
  {
    id: 2,
    name: "Dashboard",
    path: "/dashboard/instructor",
    type: ACCOUNT_TYPE.INSTRUCTOR,
    icon: "ri-dashboard-horizontal-fill",
  },
  {
    id: 3,
    name: "My Courses",
    path: "/dashboard/my-courses",
    type: ACCOUNT_TYPE.INSTRUCTOR,
    icon: "ri-book-2-line",
  },
  {
    id: 4,
    name: "Add Course",
    path: "/dashboard/add-course",
    type: ACCOUNT_TYPE.INSTRUCTOR,
    icon: "ri-git-repository-commits-line",
  },
  {
    id: 5,
    name: "Enrolled Courses",
    path: "/dashboard/registered-courses",
    type: ACCOUNT_TYPE.STUDENT,
    icon: "ri-book-marked-line",
  },
  {
    id: 6,
    name: "Wishlist",
    path: "/dashboard/wishlist",
    type: ACCOUNT_TYPE.STUDENT,
    icon: "ri-bookmark-line",
  },
  {
    id: 7,
    name: "Admin Panel",
    path: "/dashboard/admin-panel",
    type: ACCOUNT_TYPE.ADMIN,
    icon: "ri-admin-line",
  },
];
